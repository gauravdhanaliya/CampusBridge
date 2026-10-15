import type { Campus, Place, PlaceCategory } from '@/types/place'

/**
 * DEMONSTRATION DATA ONLY.
 * "Demo Campus" is fictional. Marker positions are laid out around a point in a
 * public park purely so the map has something to show; they are NOT real buildings
 * and nothing here is verified.
 */
const BASE: [number, number] = [12.97, 77.59]
const M_LAT = 1 / 111320
const M_LNG = 1 / 108480

/** Converts metres north / east of the layout origin into [latitude, longitude]. */
export function offset(north: number, east: number): [number, number] {
  return [BASE[0] + north * M_LAT, BASE[1] + east * M_LNG]
}

export const demoCampus: Campus = {
  id: 'demo-campus',
  institution: 'Demo Institute of Technology (fictional)',
  name: 'Demo Campus',
  city: 'Sample city',
  center: offset(-5, 20),
  zoom: 17,
  isDemo: true,
}

/**
 * Offsets are in metres north / east of the layout origin. Markers are kept at least 48 m apart
 * so they stay separate at the default zoom and one level zoomed out.
 */
function place(
  id: string,
  name: string,
  category: PlaceCategory,
  north: number,
  east: number,
  description: string,
  extra: Partial<Pick<Place, 'buildingName' | 'floor' | 'roomNumber' | 'accessibility'>> = {},
): Place {
  return {
    id,
    name,
    category,
    campusId: demoCampus.id,
    buildingName: extra.buildingName ?? null,
    floor: extra.floor ?? null,
    roomNumber: extra.roomNumber ?? null,
    latitude: offset(north, east)[0],
    longitude: offset(north, east)[1],
    description,
    accessibility: extra.accessibility ?? null,
    verification: 'unverified-demo',
  }
}

export const demoPlaces: Place[] = [
  // Gates & parking
  place('gate-main', 'Main Gate', 'gate', -290, 0, 'Main vehicle and pedestrian entrance (demo).'),
  place('gate-east', 'East Entrance', 'gate', 0, 310, 'Pedestrian entrance on the east side (demo).'),
  place('park-visitor', 'Visitor Parking', 'parking', -260, -100, 'Parking area for visitors near the main gate (demo).'),
  place('park-staff', 'Staff Parking', 'parking', -190, -130, 'Reserved parking for staff (demo).'),
  place('park-two', 'Two-wheeler Parking', 'parking', -260, 120, 'Covered bicycle and two-wheeler parking (demo).'),

  // Administration
  place('adm-main', 'Main Office', 'admin', -215, -25, 'Central administrative office (demo).', {
    buildingName: 'Administration Block', floor: 'Ground', roomNumber: 'AD-001',
  }),
  place('adm-accounts', 'Accounts Office', 'admin', -215, 25, 'Fee and accounts counter (demo).', {
    buildingName: 'Administration Block', floor: '1', roomNumber: 'AD-104',
  }),
  place('adm-help', 'Admissions Help Desk', 'admin', -165, -25, 'Help desk for prospective students and visitors (demo).', {
    buildingName: 'Administration Block', floor: 'Ground', roomNumber: 'AD-003',
  }),

  // Academic blocks
  place('blk-a', 'Block A (Engineering)', 'academic', -45, -190, 'Engineering classrooms and labs (demo).', { buildingName: 'Block A' }),
  place('blk-b', 'Block B (Sciences)', 'academic', -70, 190, 'Science classrooms and laboratories (demo).', { buildingName: 'Block B' }),
  place('blk-c', 'Block C (Computing)', 'academic', 120, -190, 'Computing classrooms and labs (demo).', { buildingName: 'Block C' }),

  // Classrooms
  place('cls-a101', 'Lecture Hall A-101', 'classroom', -45, -240, 'Large lecture hall (demo).', {
    buildingName: 'Block A', floor: 'Ground', roomNumber: 'A-101',
  }),
  place('cls-a204', 'Classroom A-204', 'classroom', 5, -240, 'Standard classroom (demo).', {
    buildingName: 'Block A', floor: '2', roomNumber: 'A-204',
  }),
  place('cls-b110', 'Classroom B-110', 'classroom', -20, 140, 'Standard classroom (demo).', {
    buildingName: 'Block B', floor: '1', roomNumber: 'B-110',
  }),
  place('cls-c301', 'Seminar Hall C-301', 'classroom', 170, -190, 'Seminar hall for small talks (demo).', {
    buildingName: 'Block C', floor: '3', roomNumber: 'C-301',
  }),

  // Labs
  place('lab-phy', 'Physics Lab', 'lab', -70, 140, 'Undergraduate physics laboratory (demo).', {
    buildingName: 'Block B', floor: 'Ground', roomNumber: 'B-G02',
  }),
  place('lab-chem', 'Chemistry Lab', 'lab', -70, 240, 'Undergraduate chemistry laboratory (demo).', {
    buildingName: 'Block B', floor: 'Ground', roomNumber: 'B-G05',
  }),
  place('lab-comp', 'Computer Lab', 'lab', 70, -190, 'Computer laboratory (demo).', {
    buildingName: 'Block C', floor: '2', roomNumber: 'C-210',
  }),
  place('lab-elec', 'Electronics Lab', 'lab', -95, -240, 'Electronics laboratory (demo).', {
    buildingName: 'Block A', floor: 'Ground', roomNumber: 'A-G10',
  }),

  // Faculty
  place('fac-a301', 'Faculty Room A-301', 'faculty', 5, -190, 'Shared faculty room (demo).', {
    buildingName: 'Block A', floor: '3', roomNumber: 'A-301',
  }),
  place('fac-hod', 'HoD Cabin (Computing)', 'faculty', 120, -140, 'Head of department cabin (demo).', {
    buildingName: 'Block C', floor: '4', roomNumber: 'C-401',
  }),
  place('fac-b205', 'Staff Room B-205', 'faculty', -20, 190, 'Staff room (demo).', {
    buildingName: 'Block B', floor: '2', roomNumber: 'B-205',
  }),

  // Library
  place('lib-main', 'Central Library', 'library', 75, -25, 'Main library with books and journals (demo).', {
    buildingName: 'Central Library', floor: 'Ground',
  }),
  place('lib-read', 'Reading Hall', 'library', 125, -25, 'Quiet reading hall on the upper floor (demo).', {
    buildingName: 'Central Library', floor: '2', roomNumber: 'L-201',
  }),

  // Food
  place('caf-main', 'Main Cafeteria', 'cafeteria', -85, -25, 'Main dining hall (demo).', { buildingName: 'Cafeteria Building', floor: 'Ground' }),
  place('caf-juice', 'Juice Stall', 'cafeteria', -85, 25, 'Small outdoor stall (demo).'),

  // Toilets
  place('toi-a', 'Toilets, Block A', 'toilet', -95, -190, 'Toilets on the ground floor (demo).', { buildingName: 'Block A', floor: 'Ground' }),
  place('toi-a-acc', 'Accessible Toilet, Block A', 'toilet', -95, -140, 'Accessible toilet (demo).', {
    buildingName: 'Block A', floor: 'Ground',
    accessibility: 'Listed as an accessible toilet in demo data; details not confirmed.',
  }),
  place('toi-c', 'Toilets, Block C', 'toilet', 120, -240, 'Toilets on the first floor (demo).', { buildingName: 'Block C', floor: '1' }),
  place('toi-lib', 'Toilets, Library', 'toilet', 75, 25, 'Toilets near the library entrance (demo).', { buildingName: 'Central Library', floor: 'Ground' }),

  // Water
  place('wat-a', 'Drinking Water, Block A', 'water', -45, -140, 'Water station (demo).', { buildingName: 'Block A', floor: 'Ground' }),
  place('wat-caf', 'Drinking Water, Cafeteria', 'water', -35, -25, 'Water station beside the cafeteria (demo).', { buildingName: 'Cafeteria Building' }),
  place('wat-c', 'Drinking Water, Block C', 'water', 70, -240, 'Water station (demo).', { buildingName: 'Block C', floor: '1' }),

  // Waste
  place('was-caf', 'Dustbins, Cafeteria', 'waste', -35, 25, 'Segregated dustbins (demo).', { buildingName: 'Cafeteria Building' }),
  place('was-coll', 'Waste Collection Point', 'waste', -120, 90, 'Central waste collection point (demo).'),
  place('was-b', 'Dustbins, Block B', 'waste', -20, 240, 'Dustbins near Block B (demo).', { buildingName: 'Block B' }),

  // Stairs & lifts
  place('stl-a', 'Main Staircase, Block A', 'stairs-lift', 5, -140, 'Main staircase (demo).', { buildingName: 'Block A' }),
  place('stl-c', 'Lift, Block C', 'stairs-lift', 70, -140, 'Passenger lift (demo).', { buildingName: 'Block C', floor: 'Ground' }),
  place('stl-lib', 'Lift, Library', 'stairs-lift', 125, 25, 'Passenger lift (demo).', { buildingName: 'Central Library', floor: 'Ground' }),

  // Safety
  place('saf-aid', 'First Aid Room', 'safety', -165, 25, 'First aid room (demo).', { buildingName: 'Administration Block', floor: 'Ground', roomNumber: 'AD-010' }),
  place('saf-sec', 'Security Office', 'safety', -290, 60, 'Security desk near the main gate (demo).'),

  // Auditorium & events
  place('aud-main', 'Main Auditorium', 'auditorium', 100, 190, 'Auditorium for large events (demo).', { buildingName: 'Auditorium', floor: 'Ground' }),
  place('aud-stage', 'Open Air Stage', 'auditorium', 100, 240, 'Outdoor stage for cultural events (demo).'),
  place('aud-reg', 'Event Registration Desk', 'auditorium', 100, 140, 'Registration desk used during events (demo).', { buildingName: 'Auditorium', floor: 'Ground' }),

  // Sports & hostels
  place('spo-ground', 'Sports Ground', 'sports-hostel', 250, -50, 'Open sports ground (demo).'),
  place('spo-hall', 'Indoor Sports Hall', 'sports-hostel', 250, 50, 'Indoor courts (demo).', { buildingName: 'Sports Complex', floor: 'Ground' }),
  place('hos-boys', "Boys' Hostel", 'sports-hostel', 250, -190, 'Student residence (demo).'),
  place('hos-girls', "Girls' Hostel", 'sports-hostel', 250, 190, 'Student residence (demo).'),
]
