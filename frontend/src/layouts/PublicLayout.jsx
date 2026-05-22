import { Outlet } from 'react-router-dom'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'

export default function PublicLayout() {
  return (
    <div style={{ background: 'var(--background)' }}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
