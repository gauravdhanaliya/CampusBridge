# CampusBridge — Progress

_Last updated: 2026-10-15_

## Current phase
**Phase 2 — Campus Explorer** (branch `phase-2-campus-explorer`): **complete**, waiting for the user to commit, merge and tag `phase-2`.

## Blocker for later phases
`docs/MASTER_GUIDE.md` (the product spec for phases 1–8) is **missing**. It is not in the project folder,
any git branch, tag or stash, or the usual Desktop / Documents / Downloads folders.
Phase 2 was finished from the Phase 2 spec given in chat. Phases 3+ need the guide.

## Phase 1 — done (tag `phase-1`)
Vite + React 18 + TypeScript + Tailwind 3 scaffold, design tokens, sidebar / bottom-nav shell, placeholder pages.

## Phase 2 — tasks
- [x] Leaflet 1.9.4 + react-leaflet 4.2.1 map with OSM tiles and attribution
- [x] 48 demo places in 16 categories, typed data in `src/types`, `src/data`
- [x] Search (name, room, building, category), category filters, clear, empty state
- [x] Marker selection, popups, details panel / mobile bottom sheet
- [x] Directions panel with clearly labelled illustrative straight line
- [x] No overlapping markers at default zoom and one level out (data layout, no clustering)
- [x] Building outlines, dashed demo-campus boundary with "fictional layout" label
- [x] Compact desktop filters, distinct gate colour
- [x] Fit to search/filter results; campus overview fits boundary; fit on first load
- [x] Compact mobile header; map ≥ 60% of the space at 390×844 (measured 80%)
- [x] Selected marker kept above the mobile sheet
- [x] Mobile: zoom control no longer covers the popup (decision below)
- [x] 360 px phones open at zoom 16, not 15 (markers overlapped)
- [x] Popup closes when the details sheet / selection closes
- [x] Phase 2 completion checks (typecheck, lint, build, desktop + 390 px, console, Phase 1 pages)

## Decisions
- Tailwind 3.4 (not 4) for a stable config-file setup. Exact version pins everywhere.
- Demo campus is fictional, drawn over Cubbon Park, Bengaluru; every place is "Unverified demo data".
- Markers ≥ 50 m apart; 30 px at zoom ≥ 17, 20 px at ≤ 16. No clustering library.
- Gates colour olive `#6B7A00` (4.76:1 with white); red is only First aid & security.
- Desktop and mobile headers are separate JSX branches so mobile tweaks cannot change desktop.
- Mobile map controls: zoom buttons move to bottom-right and Campus overview sits above them, so the
  details sheet covers them instead of them covering the popup; pinch-zoom still works while the sheet is open.
- Mobile campus fit uses 12 px padding (desktop keeps 24 px) so a 360 px phone fits at zoom 16.

## Testing approach
Browser checks drive the real app in the installed Chrome via Playwright (installed in a scratch folder,
not in the project). Desktop "unchanged" is proven by byte-comparing screenshots and the page HTML
against a baseline taken before each mobile-only change.

## Known limitations
- Directions are a straight illustrative line: no routing, no walking times, no indoor floor plans.
- Below ~330 px map width (phones narrower than ~360 px) the campus fits only at zoom 15, where markers overlap.
- On phones the campus opens at zoom 16; zooming out further (15) overlaps markers.
- While the mobile details sheet is open the zoom buttons are under it; pinch-zoom still works.
- On 360×640 a three-line popup loses ~3 px of white padding at the top; its text is fully visible.
- Search re-fits the map on every keystroke.
- OSM public tile server is fine for development, not heavy production traffic.

## Next step
User: commit, merge and tag Phase 2, and add `docs/MASTER_GUIDE.md` (needed for Phases 3–8).
Then, on "continue": read Phase 3 in the guide, list its tasks here, and start.
