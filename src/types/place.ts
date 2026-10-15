export type PlaceCategory =
  | 'academic'
  | 'classroom'
  | 'lab'
  | 'faculty'
  | 'admin'
  | 'library'
  | 'cafeteria'
  | 'toilet'
  | 'water'
  | 'waste'
  | 'parking'
  | 'gate'
  | 'stairs-lift'
  | 'safety'
  | 'auditorium'
  | 'sports-hostel'

/** 'verified' is reserved for data confirmed by a college admin; demo data never uses it. */
export type VerificationStatus = 'unverified-demo' | 'pending' | 'verified'

export interface Campus {
  id: string
  institution: string
  name: string
  city: string
  center: [number, number]
  zoom: number
  isDemo: boolean
}

export interface Place {
  id: string
  name: string
  category: PlaceCategory
  campusId: string
  buildingName: string | null
  floor: string | null
  roomNumber: string | null
  latitude: number
  longitude: number
  description: string
  /** null means nobody has provided accessibility information. */
  accessibility: string | null
  verification: VerificationStatus
}

export type LatLngPair = [number, number]

/** Simple footprint drawn under the markers. Fictional, like the rest of the demo campus. */
export interface BuildingOutline {
  id: string
  name: string
  polygon: LatLngPair[]
}

export interface CampusBoundary {
  polygon: LatLngPair[]
  label: string
  labelAt: LatLngPair
}
