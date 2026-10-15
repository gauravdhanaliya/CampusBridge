import L from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { categories } from '@/config/categories'
import type { PlaceCategory } from '@/types/place'

const cache = new Map<string, L.DivIcon>()

/**
 * Round coloured marker with a white icon. Leaflet's default PNG marker is not used.
 * `compact` is used when zoomed out so neighbouring markers stay apart.
 */
export function placeIcon(category: PlaceCategory, selected: boolean, compact: boolean): L.DivIcon {
  const key = `${category}:${selected}:${compact}`
  const hit = cache.get(key)
  if (hit) return hit

  const { color, icon } = categories[category]
  const size = selected ? (compact ? 32 : 44) : compact ? 20 : 30
  const svg = renderToStaticMarkup(
    createElement(icon, { size: selected ? (compact ? 16 : 22) : compact ? 11 : 16, color: '#fff', strokeWidth: 2.2 }),
  )
  const ring = selected ? `box-shadow:0 0 0 5px ${color}55,0 2px 6px rgba(0,0,0,.35);` : 'box-shadow:0 1px 4px rgba(0,0,0,.35);'
  const made = L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;background:${color};border:2px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;${ring}">${svg}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
  cache.set(key, made)
  return made
}

/** Lettered pin used for the start (A) and destination (B) of an illustrative line. */
export function endpointIcon(letter: 'A' | 'B'): L.DivIcon {
  const bg = letter === 'A' ? '#116B5A' : '#B4530A'
  return L.divIcon({
    className: '',
    html: `<div style="width:30px;height:30px;background:${bg};color:#fff;border:3px solid #fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font:700 14px system-ui;box-shadow:0 2px 6px rgba(0,0,0,.4)">${letter}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

/** Text pill for the campus boundary; the zero-size icon box lets CSS centre the pill on the point. */
export function boundaryLabelIcon(text: string): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div class="campus-boundary-label">${text}</div>`,
    iconSize: [0, 0],
  })
}
