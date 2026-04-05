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

## Main App Structure

- `app/` contains Expo Router routes
- `components/vibe-guide/` contains the reusable VibeGuide UI
- `api/` contains the current mock async data layer

## Verification

- `npm run lint`
- `npx tsc --noEmit`
