# VibeGuide Expo

Expo Router app for the VibeGuide mobile experience.

## Start

```bash
npm install
npm start
```

If PowerShell blocks `npm`, use:

```bash
cmd /c npm start
```

## Connect To A Local Backend

Create a repo-root `.env` file with:

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
EXPO_PUBLIC_DEFAULT_USER_ID=00000000-0000-0000-0000-000000000001
```

Replace `EXPO_PUBLIC_DEFAULT_USER_ID` with a real user UUID from your backend so favorites, wishlist, and visited endpoints return real data.

Run the app in the browser with:

```bash
npm run web
```

The frontend will use real backend data whenever `EXPO_PUBLIC_API_BASE_URL` is reachable. If the backend is down or an endpoint is unavailable, it falls back to the local mock contract data.

If you are using Spring Boot for the backend, make sure CORS allows the Expo web origin, typically `http://localhost:8081`.

## Main App Structure

- `app/` contains Expo Router routes
- `components/vibe-guide/` contains the reusable VibeGuide UI
- `api/` contains the current mock async data layer

## Verification

- `npm run lint`
- `npx tsc --noEmit`
