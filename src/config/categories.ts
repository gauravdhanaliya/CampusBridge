import {
  ArrowUpDown,
  Building2,
  Briefcase,
  DoorOpen,
  Droplet,
  FlaskConical,
  HeartPulse,
  Library,
  LogIn,
  ParkingCircle,
  Theater,
  Toilet,
  Trash2,
  Trophy,
  User,
  Utensils,
  type LucideIcon,
} from 'lucide-react'
import type { PlaceCategory } from '@/types/place'

export interface CategoryMeta {
  label: string
  /** Used for the compact mobile chips. */
  short: string
  icon: LucideIcon
  /** Dark enough that a white icon on it has at least 4.5:1 contrast. */
  color: string
}

export const categories: Record<PlaceCategory, CategoryMeta> = {
  academic: { label: 'Academic buildings', short: 'Academic', icon: Building2, color: '#116B5A' },
  classroom: { label: 'Classrooms & halls', short: 'Classrooms', icon: DoorOpen, color: '#1F6FC9' },
  lab: { label: 'Laboratories', short: 'Labs', icon: FlaskConical, color: '#6553C9' },
  faculty: { label: 'Faculty & staff rooms', short: 'Faculty', icon: User, color: '#4F46A5' },
  admin: { label: 'Administrative offices', short: 'Offices', icon: Briefcase, color: '#0E5C86' },
  library: { label: 'Library', short: 'Library', icon: Library, color: '#8A3FA8' },
  cafeteria: { label: 'Cafeteria & canteen', short: 'Food', icon: Utensils, color: '#B4530A' },
  toilet: { label: 'Toilets', short: 'Toilets', icon: Toilet, color: '#1B7585' },
  water: { label: 'Drinking water', short: 'Water', icon: Droplet, color: '#1565C0' },
  waste: { label: 'Dustbins & waste', short: 'Dustbins', icon: Trash2, color: '#5B6657' },
  parking: { label: 'Parking', short: 'Parking', icon: ParkingCircle, color: '#475569' },
  gate: { label: 'Gates & entrances', short: 'Gates', icon: LogIn, color: '#6B7A00' },
  'stairs-lift': { label: 'Stairs & lifts', short: 'Stairs/lifts', icon: ArrowUpDown, color: '#7A5A00' },
  safety: { label: 'First aid & security', short: 'First aid', icon: HeartPulse, color: '#C0262D' },
  auditorium: { label: 'Auditorium & events', short: 'Events', icon: Theater, color: '#A21CAF' },
  'sports-hostel': { label: 'Sports & hostels', short: 'Sports', icon: Trophy, color: '#2B7A30' },
}

export const categoryOrder = Object.keys(categories) as PlaceCategory[]
