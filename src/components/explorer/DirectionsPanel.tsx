import { ArrowDownUp, ArrowLeft, Info } from 'lucide-react'
import { categories, categoryOrder } from '@/config/categories'
import { placeSubtitle } from '@/lib/placeSearch'
import type { Place } from '@/types/place'

interface Props {
  places: Place[]
  fromId: string
  toId: string
  onChange: (next: { fromId: string; toId: string }) => void
  onClose: () => void
}

function PlaceSelect({ id, label, value, places, onChange }: {
  id: string
  label: string
  value: string
  places: Place[]
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
      >
        {categoryOrder.map((cat) => {
          const inCat = places.filter((p) => p.category === cat)
          if (inCat.length === 0) return null
          return (
            <optgroup key={cat} label={categories[cat].label}>
              {inCat.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </optgroup>
          )
        })}
      </select>
    </div>
  )
}

export default function DirectionsPanel({ places, fromId, toId, onChange, onClose }: Props) {
  const from = places.find((p) => p.id === fromId)
  const to = places.find((p) => p.id === toId)

  return (
    <div className="p-4">
      <button type="button" onClick={onClose} className="mb-3 flex items-center gap-1 text-sm font-semibold text-campus">
        <ArrowLeft size={16} aria-hidden /> Back to details
      </button>
      <h2 className="text-lg font-bold">Directions</h2>

      <div className="mt-3 space-y-3">
        <PlaceSelect id="dir-from" label="Start" value={fromId} places={places} onChange={(v) => onChange({ fromId: v, toId })} />
        <button
          type="button"
          onClick={() => onChange({ fromId: toId, toId: fromId })}
          className="btn-secondary w-full py-1.5"
        >
          <ArrowDownUp size={14} aria-hidden /> Swap start and destination
        </button>
        <PlaceSelect id="dir-to" label="Destination" value={toId} places={places} onChange={(v) => onChange({ fromId, toId: v })} />
      </div>

      {from && to && (
        <ol className="mt-4 space-y-2 text-sm">
          <li className="rounded-xl bg-campus-light p-3">
            <span className="font-bold text-campus">A · Start:</span> {from.name}
            <span className="block text-xs text-slate-600">{placeSubtitle(from) || categories[from.category].label}</span>
          </li>
          <li className="rounded-xl bg-orange-light p-3">
            <span className="font-bold text-orange-800">B · Destination:</span> {to.name}
            <span className="block text-xs text-slate-600">{placeSubtitle(to) || categories[to.category].label}</span>
          </li>
        </ol>
      )}

      <p className="mt-4 flex gap-2 rounded-xl bg-blue-light p-3 text-xs text-slate-700">
        <Info size={16} className="mt-0.5 shrink-0 text-blue" aria-hidden />
        <span>
          The dotted line on the map is a straight line between the two points, drawn for illustration. It is not a
          real walking route and does not follow paths. Walking times and turn-by-turn directions are not available
          yet. Indoor floor plans come in a later phase.
        </span>
      </p>
    </div>
  )
}
