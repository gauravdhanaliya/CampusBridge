import { useLocation } from 'react-router-dom'
import { Construction } from 'lucide-react'
import { navItems } from '@/config/navigation'

/** Honest placeholder: the screen is not built yet and says so. */
export default function ComingSoon() {
  const { pathname } = useLocation()
  const item = navItems.find((i) => i.to === pathname)
  const isHome = pathname === '/'

  return (
    <div className="mx-auto max-w-xl">
      {isHome && (
        <>
          <h1 className="text-2xl font-bold lg:text-3xl">Your campus. Every campus.</h1>
          <p className="mt-1 text-slate-600">Different Campuses. Same Dreams.</p>
        </>
      )}
      <div className="card mt-6 flex flex-col items-center gap-3 p-8 text-center">
        <span className="rounded-full bg-orange-light p-3 text-orange">
          <Construction size={28} aria-hidden />
        </span>
        <h2 className="text-lg font-semibold">{item?.label ?? 'Page'} is not built yet</h2>
        <p className="text-sm text-slate-600">
          This is a placeholder. The real screen arrives in Phase {item?.phase ?? '?'}.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2" aria-label="Palette preview">
          <span className="badge bg-campus-light text-campus">Campus green</span>
          <span className="badge bg-orange-light text-orange">Orange</span>
          <span className="badge bg-purple-light text-purple">Purple</span>
          <span className="badge bg-blue-light text-blue">Blue</span>
        </div>
      </div>
    </div>
  )
}
