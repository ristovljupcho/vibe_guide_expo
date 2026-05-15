# Repository Instructions

## Branch Discipline

- Do all requested work explicitly on the requested git branch for the task.
- Keep changes branch-scoped and task-scoped.
- Do not introduce unrelated local changes.
- Do not introduce unrelated global changes.
- Do not modify files outside the requested task unless they are directly required to complete that task.
- If unrelated local changes are already present, leave them untouched unless the user explicitly asks otherwise.

## Stack

- **Runtime**: Expo SDK 54 on the New Architecture (Fabric + TurboModules), React 19, React Native 0.81, Hermes.
- **Language**: TypeScript.
- **Routing**: Expo Router v6 (file-based, `app/`).
- **Auth**: Clerk (`@clerk/expo`) with `tokenCache` from `@clerk/expo/token-cache` (SecureStore-backed).
- **Server state**: TanStack Query v5 (`@tanstack/react-query`), provider wired in `app/_layout.tsx`.
- **Client state**: `useState` / `useReducer` first; reach for Zustand only when state truly spans many screens.
- **UI primitives**: Components in `shared/ui/`. Theme via `shared/theme/`. Do not introduce a new UI kit.
- **Animations**: `react-native-reanimated` v4 with worklets.
- **Images**: `expo-image` (use `cachePolicy="memory-disk"` for remote images).
- **i18n**: JSON message files in `shared/domainMessages/` (see Domain Messages section below).

## Commands

- `npm start` / `npx expo start` — dev server (Metro)
- `npm run ios` / `npm run android` / `npm run web` — open on a target
- `npm run lint` — ESLint over `app api features shared`

If you add tests or formatting in a task, also add the matching `npm` script in `package.json` so it is discoverable.

## Project Structure

```
app/                # Expo Router routes (file = screen). Keep route files thin.
  _layout.tsx       # Root providers: Clerk, QueryClient, ColorScheme, Stack
  (auth)/           # Group route for unauthenticated flows
  (tabs)/           # Group route for the tab bar
  place/, profile/  # Stack groups for nested flows
api/                # Typed fetch helpers (one module per backend resource)
  apiClient.ts      # fetchJson + base URL + abort/timeout plumbing
  types.ts          # Shared DTO types
features/           # Feature folders — UI + hooks + helpers co-located
  <feature>/
    screens/        # Screen components rendered by routes in app/
    hooks/          # useXxxData / useXxxQuery / useXxxMutation
    components/     # Feature-private components
shared/             # Cross-feature primitives
  ui/               # Reusable presentational components
  theme/            # Colors, color scheme, theme hooks
  domainMessages/   # i18n JSON message files
```

Route files import a feature screen and render it; business logic stays in `features/`.
Cross-feature imports go through `shared/`. Do not reach into a sibling feature's internals.

## Server State (TanStack Query)

- Every backend call goes through a Query or Mutation hook in a feature `hooks/` folder. Screens never call `fetchJson` directly.
- One **query key factory** per resource so invalidation can target a prefix instead of a string:

```ts
export const placeKeys = {
  all: ['places'] as const,
  lists: () => [...placeKeys.all, 'list'] as const,
  list: (filters: PlaceFilters) => [...placeKeys.lists(), filters] as const,
  details: () => [...placeKeys.all, 'detail'] as const,
  detail: (id: string) => [...placeKeys.details(), id] as const,
};
```

Migrate ad-hoc string keys (`['home']`, `['saved']`, …) to factories when you next touch the hook.

- `QueryClient` defaults live in `app/_layout.tsx`. Reasonable values: `staleTime: 60_000`, `gcTime: 24h`, `retry: 1`, `refetchOnReconnect: true`.
- Wire the React Native focus + online managers once (in `app/_layout.tsx` or a small provider) so background refetch behaves correctly:

```ts
import { focusManager, onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { AppState, Platform } from 'react-native';

onlineManager.setEventListener(setOnline =>
  NetInfo.addEventListener(s => setOnline(!!s.isConnected)),
);
AppState.addEventListener('change', s => {
  if (Platform.OS !== 'web') focusManager.setFocused(s === 'active');
});
```

- For mutations: invalidate by **prefix** in `onSettled`, do optimistic updates in `onMutate`, always implement `onError` rollback.
- For paginated lists use `useInfiniteQuery` paired with FlashList's `onEndReached`.
- When persistence is needed (offline UX): use `react-native-mmkv` + `@tanstack/react-query-persist-client`. Do **not** persist Clerk session data — Clerk handles its own token cache.

## Client State

- Local UI state (open/closed, draft input, hover) → `useState` / `useReducer`.
- State that genuinely spans unrelated screens (theme, active filter, onboarding flags) → small Zustand store with selectors. Persist with MMKV when needed.
- Server data is **never** mirrored into client state. Read it from the matching Query hook.

## API Layer (`api/`)

- One module per backend resource, exporting thin typed functions. Keep React out of this layer.
- `fetchJson` currently returns `T | null` and swallows errors with `console.warn`. When introducing new endpoints used inside `useQuery`, prefer throwing on failure (or wrap in a `throwOnError` helper) so Query can surface error states.
- Normalize errors into a single `ApiError` shape over time so UI never branches on raw HTTP fields.
- Keep base-URL/auth/timeout plumbing in `apiClient.ts`. Per-resource modules only build the URL and parse the response.

## Forms

- When forms exceed trivial complexity, use **React Hook Form + Zod** (`@hookform/resolvers/zod`).
- Zod schema is the source of truth: derive types with `type Dto = z.infer<typeof schema>` and reuse the same schema for validation and the outgoing payload.

## TypeScript

- Strict mode is on. New code must not introduce `any`; use `unknown` + narrowing.
- Public hook and component props are explicitly typed; internal inference is fine.
- Backend DTO types live in `api/types.ts`. Mirror backend field names and casing in request payloads.

## Performance

- New Architecture is required (already enabled by SDK 54+); verify with `npx expo-doctor` after dependency changes.
- Lean on the React Compiler. Do not hand-write `useMemo` / `useCallback` unless the profiler shows a measurable win.
- Lists longer than ~20 items use `@shopify/flash-list` v2 (no `estimatedItemSize` needed). Memoize the row component and keep handlers stable.
- Use `expo-image` with `cachePolicy="memory-disk"` for remote images.
- Heavy or infrequently used flows: enable Expo Router lazy bundling (async routes).

## Native Modules & Permissions

- Prefer Expo modules over community ones when both exist.
- Permissions are requested **just-in-time**, with a brief in-app explainer before the system prompt.
- Permission strings live in `app.json` (`ios.infoPlist`, `android.permissions`).
- Custom native code → write an Expo Module under `modules/`. Do not add bare iOS/Android files to the app shell.

## Testing

There are no tests in the project today. When adding them in a task:

- Unit / component: **Jest** + `@testing-library/react-native`.
- Network mocking: **MSW** via `msw/native`. Never mock TanStack Query itself.
- E2E: **Maestro** flows under `e2e/`, runnable against EAS Build artifacts.
- Add the matching `npm` script (`test`, `e2e`) so the workflow is discoverable.

## Releases (EAS)

- JS-only changes ship via **EAS Update** to the matching channel.
- Native changes (new module, permission, SDK bump) require a new EAS Build and a store submission — bump `runtimeVersion` accordingly.
- Do not edit Xcode project files or `android/` build files directly; configure via `app.json` plugins.

## Security Boundaries

- Tokens and session data live only in Clerk's `tokenCache` (SecureStore) or `expo-secure-store`. Never in MMKV, AsyncStorage, or Zustand.
- Do not read or write `.env*`, EAS credentials, `google-services.json`, or `GoogleService-Info.plist`.
- Do not bypass the `api/` layer to call the backend directly from a screen or route.
- Do not log request/response bodies that may contain user PII.

## Domain Messages And Translations

- User-facing labels, placeholders, action text, and repeated UI copy MUST be defined in the domain message files instead
  of being duplicated inline across components.
- English messages MUST live in `shared/domainMessages/domainMessages_en.json`.
- Macedonian Cyrillic translations MUST live in `shared/domainMessages/domainMessages_mk.json`.
- When adding or changing a message in the English file, add or update the matching Macedonian Cyrillic translation in
  the same change set.
- Both language files MUST keep the same JSON key structure so copy can be switched by locale without component changes.

## Commit Message Standards

Commit grouping rules:

1. If pending changes are all connected and contribute to the same logical change, they SHOULD be grouped into a single
   commit.
2. If pending changes are unrelated or belong to separate logical changes, they MUST be split into multiple commits.
3. A commit SHOULD represent one coherent change that can be understood, reviewed, and reverted independently.

1. Subject line MUST be in imperative mood.
   - Good: `Add favourites toggle endpoint`
   - Bad: `Added favourites toggle endpoint`
2. Subject line MUST start with a capital letter and MUST NOT end with punctuation.
3. Subject line SHOULD be concise and ideally <= 50 characters.
4. If more context is needed, include a body separated by a blank line.
5. Body lines SHOULD wrap at ~72 characters.
6. Body MUST explain the `what` and `why`, not only the `how`.
7. Avoid vague or filler commit messages such as:
   - `fix stuff`
   - `oops`
   - `I think this works`
8. Prefer one logical change per commit.

Preferred structure:

`<type>: <imperative summary>`

Optional body:

- what changed
- why it changed
- impact/risk notes (if relevant)

Suggested commit types:

- `feat` for new functionality
- `fix` for bug fixes
- `refactor` for code restructuring without behavior changes
- `docs` for documentation changes
- `test` for tests
- `chore` for maintenance/non-feature work

## When in Doubt

1. Prefer deleting code over adding it.
2. Prefer the Expo idiom over a community workaround.
3. If a pattern is not already in the codebase, open a discussion before introducing it.
