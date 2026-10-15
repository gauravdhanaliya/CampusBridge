import { useMemo, useState } from 'react'
import { List, Map as MapIcon, Search, X } from 'lucide-react'
import CampusMap from '@/components/explorer/CampusMap'
import CategoryChips from '@/components/explorer/CategoryChips'
import DirectionsPanel from '@/components/explorer/DirectionsPanel'
import PlaceDetails from '@/components/explorer/PlaceDetails'
import PlaceList from '@/components/explorer/PlaceList'
import { demoBoundary, demoBuildings } from '@/data/demoBuildings'
import { demoCampus, demoPlaces } from '@/data/demoCampus'
import { useElementHeight } from '@/hooks/useElementHeight'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { filterPlaces } from '@/lib/placeSearch'
import type { PlaceCategory } from '@/types/place'

interface DirectionsState {
  fromId: string
  toId: string
}

export default function CampusExplorer() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [query, setQuery] = useState('')
  const [cats, setCats] = useState<Set<PlaceCategory>>(new Set())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [view, setView] = useState<'map' | 'list'>('map')
  const [directions, setDirections] = useState<DirectionsState | null>(null)
  const [sheetRef, sheetHeight] = useElementHeight<HTMLDivElement>()

  const results = useMemo(() => filterPlaces(demoPlaces, query, cats), [query, cats])
  const selected = results.find((p) => p.id === selectedId) ?? null
  const canClear = query.trim() !== '' || cats.size > 0

  const route = useMemo(() => {
    if (!directions) return null
    const from = demoPlaces.find((p) => p.id === directions.fromId)
    const to = demoPlaces.find((p) => p.id === directions.toId)
    return from && to ? { from, to } : null
  }, [directions])

  const toggleCategory = (c: PlaceCategory) =>
    setCats((prev) => {
      const next = new Set(prev)
      if (!next.delete(c)) next.add(c)
      return next
    })

  const clearFilters = () => {
    setQuery('')
    setCats(new Set())
  }

  const select = (id: string) => {
    setSelectedId(id)
    setDirections(null)
    setView('map')
  }

  const startDirections = () => {
    if (!selected) return
    const fromId = selected.id === 'gate-main' ? 'gate-east' : 'gate-main'
    setDirections({ fromId, toId: selected.id })
  }

  const panel = directions ? (
    <DirectionsPanel
      places={demoPlaces}
      fromId={directions.fromId}
      toId={directions.toId}
      onChange={setDirections}
      onClose={() => setDirections(null)}
    />
  ) : selected ? (
    <PlaceDetails
      place={selected}
      campus={demoCampus}
      onBack={() => setSelectedId(null)}
      onDirections={startDirections}
    />
  ) : (
    <PlaceList
      places={results}
      selectedId={selectedId}
      onSelect={select}
      onClear={clearFilters}
      canClear={canClear}
    />
  )

  const showSheet = !isDesktop && (selected !== null || directions !== null)

  const searchField = (placeholder: string, padY: string) => (
    <>
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search places"
        className={`w-full rounded-xl border border-slate-300 bg-white ${padY} pl-10 pr-10 text-sm`}
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label="Clear search text"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-500 hover:bg-slate-100"
        >
          <X size={16} aria-hidden />
        </button>
      )}
    </>
  )

  return (
    <div className="flex h-[calc(100dvh-11rem)] min-h-[460px] flex-col gap-3 lg:h-[calc(100dvh-4rem)] lg:flex-row lg:gap-4">
      {isDesktop ? (
        <aside className="flex min-h-0 flex-col gap-3 lg:w-96 lg:shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold lg:text-2xl">Campus Explorer</h1>
              <span className="badge bg-orange-light text-orange-800">Demo data</span>
            </div>
            <p className="hidden text-xs text-slate-600 lg:block">
              {demoCampus.name}, {demoCampus.institution}. Sample locations only: not real, not verified.
            </p>
          </div>

          <div className="relative">{searchField('Search places, rooms, buildings', 'py-2.5')}</div>

          <CategoryChips selected={cats} onToggle={toggleCategory} collapsible />

          <div className="flex items-center justify-between text-xs text-slate-600">
            <span aria-live="polite">
              {results.length} of {demoPlaces.length} places
            </span>
            <div className="flex items-center gap-2">
              {canClear && (
                <button type="button" onClick={clearFilters} className="font-semibold text-campus underline">
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* key resets the scroll position whenever the panel switches between list, details and directions */}
          <div key={directions ? 'directions' : selected ? 'details' : 'list'} className="card min-h-0 flex-1 overflow-y-auto">
            {panel}
          </div>
        </aside>
      ) : (
        <div className="flex min-h-0 flex-col gap-2">
          <h1 className="sr-only">Campus Explorer</h1>
          <p className="sr-only">
            Demo data. {demoCampus.name}, {demoCampus.institution}. Sample locations only: not real, not verified.
          </p>
          <div className="flex items-center gap-2">
            <div className="relative min-w-0 flex-1">{searchField('Search places', 'py-2')}</div>
            <div className="flex shrink-0 overflow-hidden rounded-xl border border-slate-300 text-xs" role="group" aria-label="View">
              {(['map', 'list'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                  className={`flex items-center gap-1 px-2.5 py-2 font-semibold ${
                    view === v ? 'bg-campus text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  {v === 'map' ? <MapIcon size={14} aria-hidden /> : <List size={14} aria-hidden />}
                  {v === 'map' ? 'Map' : 'List'}
                </button>
              ))}
            </div>
          </div>
          <CategoryChips selected={cats} onToggle={toggleCategory} onClear={canClear ? clearFilters : undefined} />
        </div>
      )}

      {isDesktop || view === 'map' ? (
        <section className="card relative isolate z-0 min-h-0 flex-1 overflow-hidden" aria-label="Campus map">
          <CampusMap
            places={results}
            selected={selected}
            onSelect={select}
            route={route}
            buildings={demoBuildings}
            boundary={demoBoundary}
            compactControls={!isDesktop}
            bottomInset={showSheet ? sheetHeight : 0}
          />
          {showSheet && (
            <div
              key={directions ? 'directions' : 'details'}
              ref={sheetRef}
              className="absolute inset-x-0 bottom-0 z-[1000] max-h-[55%] overflow-y-auto rounded-t-2xl bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.15)]"
            >
              {panel}
            </div>
          )}
        </section>
      ) : (
        <section className="card min-h-0 flex-1 overflow-y-auto" aria-label="Place list">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2 text-xs text-slate-600">
            <span aria-live="polite">
              {results.length} of {demoPlaces.length} places
            </span>
            {canClear && (
              <button type="button" onClick={clearFilters} className="font-semibold text-campus underline">
                Clear filters
              </button>
            )}
          </div>
          {panel}
        </section>
      )}
    </div>
  )
}
