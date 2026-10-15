import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { categories, categoryOrder } from '@/config/categories'
import type { PlaceCategory } from '@/types/place'

interface Props {
  selected: Set<PlaceCategory>
  onToggle: (c: PlaceCategory) => void
  /** Desktop: fold the 16 chips into a "Categories" section so the result list gets the space. */
  collapsible?: boolean
  /** Mobile only: shows a "Clear" chip at the start of the row. */
  onClear?: () => void
}

const mobileChip = 'flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition'

function Chips({ keys, selected, onToggle, compact, mobile = false }: {
  keys: PlaceCategory[]
  selected: Set<PlaceCategory>
  onToggle: (c: PlaceCategory) => void
  compact: boolean
  /** Short labels in small chips; the full name stays available as a tooltip. */
  mobile?: boolean
}) {
  return (
    <>
      {keys.map((key) => {
        const { label, short, icon: Icon, color } = categories[key]
        const on = selected.has(key)
        return (
          <button
            key={key}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(key)}
            title={mobile ? label : undefined}
            className={
              mobile
                ? mobileChip
                : `flex shrink-0 items-center rounded-full border font-semibold transition ${
                    compact ? 'gap-1 px-2 py-0.5 text-[11px]' : 'gap-1.5 px-3 py-1.5 text-xs'
                  }`
            }
            style={
              on
                ? { background: color, borderColor: color, color: '#fff' }
                : { background: '#fff', borderColor: `${color}55`, color }
            }
          >
            <Icon size={compact || mobile ? 12 : 14} aria-hidden />
            {mobile ? short : label}
          </button>
        )
      })}
    </>
  )
}

export default function CategoryChips({ selected, onToggle, collapsible = false, onClear }: Props) {
  const [open, setOpen] = useState(false)

  if (!collapsible) {
    return (
      <div
        className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1"
        role="group"
        aria-label="Filter by category"
      >
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear filters"
            className={`${mobileChip} border-slate-300 bg-slate-100 text-slate-700`}
          >
            <X size={12} aria-hidden />
            Clear
          </button>
        )}
        <Chips keys={categoryOrder} selected={selected} onToggle={onToggle} compact={false} mobile />
      </div>
    )
  }

  const chosen = categoryOrder.filter((k) => selected.has(k))

  return (
    <div role="group" aria-label="Filter by category">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
      >
        <span>
          Categories{' '}
          <span className="font-normal text-slate-600">
            · {selected.size === 0 ? 'all 16' : `${selected.size} selected`}
          </span>
        </span>
        <ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {(open || chosen.length > 0) && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Chips keys={open ? categoryOrder : chosen} selected={selected} onToggle={onToggle} compact />
        </div>
      )}
    </div>
  )
}
