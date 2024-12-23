import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar'

export default function NavbarLayout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}