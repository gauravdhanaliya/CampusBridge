# CampusBridge

*Different Campuses. Same Dreams.* — a college networking and campus navigation platform for India.

**Status: Phase 1 (scaffold + app shell).** Pages are honest placeholders; no real features yet.

## Install and run

```bash
npm install      # downloads the libraries listed in package.json
npm run dev      # starts the dev server, open the printed http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with live reload |
| `npm run typecheck` | TypeScript checks types without producing files |
| `npm run lint` | ESLint looks for likely bugs |
| `npm run build` | Type-checks, then makes the production build in `dist/` |

## Environment variables

None yet. Supabase keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) arrive in Phase 5. Never put a service-role key in frontend code.

## Database setup / deployment

Added in Phases 5 and 6.
