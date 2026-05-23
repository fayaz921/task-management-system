import { Outlet } from 'react-router-dom'
import Navbar from '../features/landing/components/Navbar'
import Footer from '../features/landing/components/Footer'

export default function PublicLayout() {
  return (
    <div style={{ background: 'var(--background)' }}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
