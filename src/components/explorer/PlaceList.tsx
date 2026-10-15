import { SearchX } from 'lucide-react'
import { categories } from '@/config/categories'
import { placeSubtitle } from '@/lib/placeSearch'
import type { Place } from '@/types/place'

interface Props {
  places: Place[]
  selectedId: string | null
  onSelect: (id: string) => void
  onClear: () => void
  canClear: boolean
}

export default function PlaceList({ places, selectedId, onSelect, onClear, canClear }: Props) {
  if (places.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 p-8 text-center">
        <SearchX className="text-slate-400" size={32} aria-hidden />
        <h2 className="text-base font-semibold">No places match</h2>
        <p className="text-sm text-slate-600">Try a different name, room number or building, or remove a filter.</p>
        {canClear && (
          <button type="button" className="btn-secondary mt-2" onClick={onClear}>
            Clear filters
          </button>
        )}
      </div>
    )
  }

  return (
    <ul className="divide-y divide-slate-100">
      {places.map((p) => {
        const { icon: Icon, color, label } = categories[p.category]
        return (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onSelect(p.id)}
              aria-current={p.id === selectedId}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-campus-light ${
                p.id === selectedId ? 'bg-campus-light' : ''
              }`}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
                style={{ background: color }}
              >
                <Icon size={18} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-slate-900">{p.name}</span>
                <span className="block truncate text-xs text-slate-600">
                  {[label, placeSubtitle(p)].filter(Boolean).join(' · ')}
                </span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
