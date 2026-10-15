import { Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import CampusExplorer from '@/pages/CampusExplorer'
import ComingSoon from '@/pages/ComingSoon'
import { navItems } from '@/config/navigation'

/** Routes whose real screen exists; everything else shows the placeholder. */
const builtPages: Record<string, JSX.Element> = {
  '/map': <CampusExplorer />,
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {navItems.map(({ to }) => (
          <Route key={to} path={to} element={builtPages[to] ?? <ComingSoon />} />
        ))}
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  )
}
