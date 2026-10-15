import { NavLink } from 'react-router-dom'
import { navItems } from '@/config/navigation'
import Logo from './Logo'

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col bg-campus-dark p-4 lg:flex">
      <div className="px-2 py-3">
        <Logo light />
      </div>
      <nav className="mt-6 flex flex-col gap-1" aria-label="Main">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-campus text-white' : 'text-white/75 hover:bg-white/10'
              }`
            }
          >
            <Icon size={18} aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>
      <p className="mt-auto px-2 text-xs text-white/60">
        Stronger Campuses
        <br />A Brighter Future
      </p>
    </aside>
  )
}
