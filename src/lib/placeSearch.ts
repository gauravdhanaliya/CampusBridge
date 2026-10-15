import { categories } from '@/config/categories'
import type { Place, PlaceCategory } from '@/types/place'

export function placeSubtitle(p: Place): string {
  return [p.buildingName, p.floor ? `Floor ${p.floor}` : null, p.roomNumber ? `Room ${p.roomNumber}` : null]
    .filter(Boolean)
    .join(' · ')
}

/**
 * Every word typed must match the place name, room number, building or category label.
 * An empty query and an empty category set match everything.
 */
export function filterPlaces(places: Place[], query: string, selected: Set<PlaceCategory>): Place[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  return places.filter((p) => {
    if (selected.size > 0 && !selected.has(p.category)) return false
    if (words.length === 0) return true
    const haystack = [p.name, p.roomNumber, p.buildingName, categories[p.category].label]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return words.every((w) => haystack.includes(w))
  })
}
