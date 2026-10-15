import { Bookmark, CalendarDays, Compass, MapPin, Users, type LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  /** Phase in which the real screen is built. */
  phase: number
  /** Show in the mobile bottom bar (max 5 keeps it thumb-friendly). */
  mobile: boolean
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Discover', icon: Compass, phase: 2, mobile: true },
  { to: '/map', label: 'Campus Map', icon: MapPin, phase: 3, mobile: true },
  { to: '/events', label: 'Events', icon: CalendarDays, phase: 4, mobile: true },
  { to: '/community', label: 'Community', icon: Users, phase: 4, mobile: true },
  { to: '/saved', label: 'Saved Places', icon: Bookmark, phase: 3, mobile: false },
]
