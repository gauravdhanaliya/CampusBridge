import { NavLink } from 'react-router-dom'
import { navItems } from '@/config/navigation'

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 flex border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label="Main"
    >
      {navItems
        .filter((i) => i.mobile)
        .map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium ${
                isActive ? 'text-campus' : 'text-slate-500'
              }`
            }
          >
            <Icon size={22} aria-hidden />
            {label.replace('Campus ', '')}
          </NavLink>
        ))}
    </nav>
  )
}
