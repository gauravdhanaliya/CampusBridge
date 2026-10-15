import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import Logo from './Logo'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <header className="sticky top-0 z-10 flex h-14 items-center bg-white px-4 shadow-sm lg:hidden">
        <Logo />
      </header>
      <main className="px-4 pb-24 pt-6 lg:ml-60 lg:px-8 lg:pb-10">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
