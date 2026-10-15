# CampusBridge

*Different Campuses. Same Dreams.* — a college networking and campus navigation platform for India.

**Status: Phase 2 (Campus Explorer).** The Campus Map page works with clearly labelled demonstration data.
Other pages are still placeholders. See [docs/PROGRESS.md](docs/PROGRESS.md) for details.

## Install and run

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install      # downloads the libraries listed in package.json
npm run dev      # starts the dev server; open http://localhost:5173/map
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with live reload |
| `npm run typecheck` | TypeScript checks types without producing files |
| `npm run lint` | ESLint looks for likely bugs |
| `npm run build` | Type-checks, then makes the production build in `dist/` |
| `npm run preview` | Serves the production build locally |

## Campus Explorer (Phase 2)

- Interactive map using [Leaflet](https://leafletjs.com) and OpenStreetMap tiles (needs an internet connection).
- 48 sample places in 16 categories, building outlines and a dashed campus boundary.
- Search by name, room number, building or category; filter by category; place details; directions panel.

**All campus data is fictional demonstration data.** The demo campus is drawn over a real map
(Cubbon Park, Bengaluru) only so there is something to look at; no building or room is real or verified.
The directions line is a straight illustrative line, not a walking route.

Demo data lives in `src/data/` and is kept separate from UI components.

## Environment variables

None yet. Supabase keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) arrive in a later phase.
Never put a service-role key in frontend code, and never commit `.env` files.

## Database setup / deployment

Added in later phases.
