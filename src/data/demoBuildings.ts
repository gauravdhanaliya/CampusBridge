import type { BuildingOutline, CampusBoundary, LatLngPair } from '@/types/place'
import { offset } from './demoCampus'

/** DEMONSTRATION DATA ONLY. Footprints are fictional rectangles, not surveyed buildings. */

/** Rectangle centred (north, east) metres from the layout origin, half-sizes in metres. */
function rect(north: number, east: number, halfN: number, halfE: number): LatLngPair[] {
  return [
    offset(north - halfN, east - halfE),
    offset(north - halfN, east + halfE),
    offset(north + halfN, east + halfE),
    offset(north + halfN, east - halfE),
  ]
}

export const demoBuildings: BuildingOutline[] = [
  { id: 'b-admin', name: 'Administration Block', polygon: rect(-190, 0, 45, 45) },
  { id: 'b-cafeteria', name: 'Cafeteria Building', polygon: rect(-60, 0, 45, 45) },
  { id: 'b-a', name: 'Block A (Engineering)', polygon: rect(-45, -190, 65, 65) },
  { id: 'b-b', name: 'Block B (Sciences & Lab Complex)', polygon: rect(-45, 190, 40, 65) },
  { id: 'b-c', name: 'Block C (Computing)', polygon: rect(120, -190, 65, 65) },
  { id: 'b-library', name: 'Central Library', polygon: rect(100, 0, 45, 45) },
  { id: 'b-auditorium', name: 'Auditorium', polygon: rect(100, 190, 40, 75) },
  { id: 'b-boys', name: "Boys' Hostel", polygon: rect(250, -190, 40, 55) },
  { id: 'b-girls', name: "Girls' Hostel", polygon: rect(250, 190, 40, 55) },
  { id: 'b-sports', name: 'Sports Complex', polygon: rect(250, 0, 45, 100) },
]

export const demoBoundary: CampusBoundary = {
  polygon: [
    offset(-330, -250),
    offset(-330, 340),
    offset(-40, 355),
    offset(320, 340),
    offset(320, -300),
    offset(-40, -300),
  ],
  label: 'Demo campus (fictional layout)',
  labelAt: offset(320, 20),
}
