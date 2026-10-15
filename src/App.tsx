import { Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ComingSoon from '@/pages/ComingSoon'
import { navItems } from '@/config/navigation'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {navItems.map(({ to }) => (
          <Route key={to} path={to} element={<ComingSoon />} />
        ))}
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  )
}
