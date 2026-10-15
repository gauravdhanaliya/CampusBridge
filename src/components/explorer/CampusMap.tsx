import { useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import {
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
  ZoomControl,
} from 'react-leaflet'
import { LocateFixed } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import { categories } from '@/config/categories'
import { boundaryLabelIcon, endpointIcon, placeIcon } from '@/lib/markerIcon'
import { placeSubtitle } from '@/lib/placeSearch'
import type { BuildingOutline, CampusBoundary, Place } from '@/types/place'

interface Props {
  places: Place[]
  selected: Place | null
  onSelect: (id: string) => void
  route: { from: Place; to: Place } | null
  buildings: BuildingOutline[]
  boundary: CampusBoundary
  /** Mobile: zoom + icon-only overview buttons at bottom-right, "Demo data" chip in the fictional-layout note. */
  compactControls?: boolean
  /** Height in px of anything covering the bottom of the map (the mobile details sheet); 0 if none. */
  bottomInset?: number
}

/** Markers shrink at this zoom or lower, and building names are shown from LABEL_ZOOM. */
const COMPACT_ZOOM = 16
const LABEL_ZOOM = 18
const OVERVIEW_PADDING: L.PointExpression = [24, 24]
/** Tighter on phones so a 360 px screen still fits the campus at zoom 16 (no overlapping markers). */
const MOBILE_OVERVIEW_PADDING: L.PointExpression = [12, 12]
/** Half the selected marker's height at zoom 17+. */
const SELECTED_HALF = 22
/** Preferred and minimum gap between the marker and the top of the sheet. */
const SHEET_GAP = 16
const MIN_SHEET_GAP = 4
/** Space the popup needs above the marker centre: a three-line popup, its tail, and half the marker. */
const POPUP_ROOM = 120 + 13 + SELECTED_HALF

/**
 * Map centre that puts `target` just above a sheet covering the bottom `inset` px,
 * leaving the space above the marker for its popup. The marker always stays above the sheet;
 * when space is short it moves closer to the sheet to give the popup more room.
 * With no inset it is the target itself.
 */
function centreAboveInset(map: L.Map, target: L.LatLngTuple, zoom: number, inset: number): L.LatLng {
  const latLng = L.latLng(target)
  if (inset <= 0) return latLng
  const height = map.getSize().y
  const visible = height - inset
  const lowest = visible - SELECTED_HALF - MIN_SHEET_GAP
  const markerY = Math.max(SELECTED_HALF, Math.min(lowest, Math.max(visible - SELECTED_HALF - SHEET_GAP, POPUP_ROOM)))
  const point = map.project(latLng, zoom).add([0, height / 2 - markerY])
  return map.unproject(point, zoom)
}

function useZoom() {
  const map = useMap()
  const [zoom, setZoom] = useState(map.getZoom())
  useMapEvents({ zoomend: () => setZoom(map.getZoom()) })
  return zoom
}

/** Moves the camera when the visible results, the selection or the illustrative line change. */
function CameraController({
  places,
  selected,
  route,
  bottomInset = 0,
}: Pick<Props, 'places' | 'selected' | 'route' | 'bottomInset'>) {
  const map = useMap()
  const routeKey = route ? `${route.from.id}>${route.to.id}` : ''
  const resultsKey = places.map((p) => p.id).join(',')
  const firstRun = useRef(true)

  // Search or filter changed: fit the visible markers, or fly to a single one.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false // the initial view is the campus boundary, set by MapContainer
      return
    }
    if (route || places.length === 0) return
    if (places.length === 1) {
      map.flyTo([places[0].latitude, places[0].longitude], 18, { duration: 0.6 })
    } else {
      map.fitBounds(L.latLngBounds(places.map((p) => [p.latitude, p.longitude] as [number, number])), {
        padding: [40, 40],
        maxZoom: 18,
        animate: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultsKey, map])

  useEffect(() => {
    if (route) {
      map.closePopup()
      map.flyToBounds(
        L.latLngBounds([route.from.latitude, route.from.longitude], [route.to.latitude, route.to.longitude]),
        { padding: [60, 60], maxZoom: 18, duration: 0.6 },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey, map])

  // Also re-runs when the sheet appears or changes height, so the marker stays above it, and on
  // mobile when directions close (desktop keeps its old behaviour: mobileRouteKey is always '').
  const mobileRouteKey = bottomInset > 0 ? routeKey : ''
  useEffect(() => {
    if (selected && !route) {
      const zoom = Math.max(map.getZoom(), 18)
      const target: L.LatLngTuple = [selected.latitude, selected.longitude]
      map.flyTo(bottomInset > 0 ? centreAboveInset(map, target, zoom, bottomInset) : target, zoom, { duration: 0.6 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id, bottomInset, mobileRouteKey, map])

  return null
}

function PlaceMarker({
  place,
  isSelected,
  compact,
  onSelect,
  manualPan,
}: {
  place: Place
  isSelected: boolean
  compact: boolean
  onSelect: (id: string) => void
  /** Mobile: the camera places the marker above the sheet, so the popup must not auto-pan it back. */
  manualPan: boolean
}) {
  const ref = useRef<L.Marker>(null)

  useEffect(() => {
    if (isSelected) ref.current?.openPopup()
    // Close it when the selection ends, so a stale popup can't cover the next marker.
    else if (ref.current?.isPopupOpen()) ref.current.closePopup()
  }, [isSelected])

  return (
    <Marker
      ref={ref}
      position={[place.latitude, place.longitude]}
      icon={placeIcon(place.category, isSelected, compact)}
      zIndexOffset={isSelected ? 1000 : 0}
      eventHandlers={{ click: () => onSelect(place.id) }}
      title={place.name}
      alt={place.name}
    >
      <Popup {...(manualPan ? { autoPan: false } : {})}>
        <div className="font-sans">
          <p className="font-semibold text-slate-900">{place.name}</p>
          <p className="text-xs text-slate-600">{categories[place.category].label}</p>
          {placeSubtitle(place) && <p className="text-xs text-slate-600">{placeSubtitle(place)}</p>}
        </div>
      </Popup>
    </Marker>
  )
}

/** Everything drawn on the map. Lives inside MapContainer so it can read the zoom level. */
function MapLayers({
  places,
  selected,
  onSelect,
  route,
  buildings,
  boundary,
  compactControls = false,
  bottomInset = 0,
}: Props) {
  const zoom = useZoom()
  const compact = zoom <= COMPACT_ZOOM
  const labelled = zoom >= LABEL_ZOOM

  return (
    <>
      <Polygon
        positions={boundary.polygon}
        interactive={false}
        pathOptions={{ color: '#0B4A3F', weight: 3, dashArray: '12 8', fill: false }}
      />
      <Marker position={boundary.labelAt} icon={boundaryLabelIcon(boundary.label)} interactive={false} keyboard={false} />

      {buildings.map((b) => (
        <Polygon
          key={b.id}
          positions={b.polygon}
          pathOptions={{ color: '#116B5A', weight: 2, fillColor: '#116B5A', fillOpacity: 0.16 }}
          eventHandlers={{
            mouseover: (e) => e.target.setStyle({ fillOpacity: 0.32 }),
            mouseout: (e) => e.target.setStyle({ fillOpacity: 0.16 }),
          }}
        >
          <Tooltip
            key={labelled ? 'label' : 'hover'}
            permanent={labelled}
            sticky={!labelled}
            direction={labelled ? 'center' : 'auto'}
            className="building-label"
          >
            {b.name}
          </Tooltip>
        </Polygon>
      ))}

      {places.map((p) => (
        <PlaceMarker
          key={p.id}
          place={p}
          isSelected={p.id === selected?.id && !route}
          compact={compact}
          onSelect={onSelect}
          manualPan={compactControls}
        />
      ))}

      {route && (
        <>
          <Polyline
            positions={[
              [route.from.latitude, route.from.longitude],
              [route.to.latitude, route.to.longitude],
            ]}
            pathOptions={{ color: '#2588E8', weight: 4, dashArray: '2 10', lineCap: 'round' }}
          />
          <Marker position={[route.from.latitude, route.from.longitude]} icon={endpointIcon('A')} zIndexOffset={2000} title={`Start: ${route.from.name}`} />
          <Marker position={[route.to.latitude, route.to.longitude]} icon={endpointIcon('B')} zIndexOffset={2000} title={`Destination: ${route.to.name}`} />
        </>
      )}
      <CameraController places={places} selected={selected} route={route} bottomInset={bottomInset} />
    </>
  )
}

export default function CampusMap({
  places,
  selected,
  onSelect,
  route,
  buildings,
  boundary,
  compactControls = false,
  bottomInset = 0,
}: Props) {
  const [map, setMap] = useState<L.Map | null>(null)
  const campusBounds = useMemo(() => L.latLngBounds(boundary.polygon), [boundary])
  const overviewPadding = compactControls ? MOBILE_OVERVIEW_PADDING : OVERVIEW_PADDING

  return (
    <div className="absolute inset-0">
      <MapContainer
        ref={setMap}
        bounds={campusBounds}
        boundsOptions={{ padding: overviewPadding }}
        zoomControl={!compactControls}
        minZoom={14}
        maxZoom={19}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <MapLayers
          places={places}
          selected={selected}
          onSelect={onSelect}
          route={route}
          buildings={buildings}
          boundary={boundary}
          compactControls={compactControls}
          bottomInset={bottomInset}
        />
        {/* Phones: bottom-right is easy to reach, and the details sheet covers it rather than it covering the popup. */}
        {compactControls && <ZoomControl position="bottomright" />}
      </MapContainer>

      {compactControls ? (
        <>
          <button
            type="button"
            onClick={() => map?.flyToBounds(campusBounds, { padding: overviewPadding, duration: 0.6 })}
            aria-label="Campus overview"
            title="Campus overview"
            className="btn absolute bottom-[104px] right-2.5 z-[500] h-[34px] w-[34px] bg-white p-0 text-campus shadow-card hover:bg-campus-light"
          >
            <LocateFixed size={18} aria-hidden />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => map?.flyToBounds(campusBounds, { padding: overviewPadding, duration: 0.6 })}
          className="btn absolute right-3 top-3 z-[500] bg-white text-campus shadow-card hover:bg-campus-light"
        >
          <LocateFixed size={16} aria-hidden />
          Campus overview
        </button>
      )}

      {compactControls ? (
        // Bottom-left keeps the top edge free for the boundary label on short screens.
        <p className="pointer-events-none absolute bottom-7 left-2.5 z-[500] flex items-center gap-1.5 rounded-full bg-white/95 py-1 pl-1 pr-3 text-[11px] font-semibold text-campus-dark shadow-card">
          <span className="badge bg-orange-light text-orange-800">Demo data</span>
          Fictional layout over a real map
        </p>
      ) : (
        <p className="pointer-events-none absolute bottom-7 left-3 z-[500] rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-campus-dark shadow-card">
          Demo campus: fictional layout over a real map
        </p>
      )}

      {route && (
        <p className="absolute left-1/2 top-14 z-[500] -translate-x-1/2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue shadow-card">
          Illustrative line only — not a real route
        </p>
      )}
    </div>
  )
}
