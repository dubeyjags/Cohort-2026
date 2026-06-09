import { Outlet } from 'react-router-dom'
import logo from '../assets/logo.png';
const LayoutCenter = () => {
  return (
    <div className="layout-center">
      <div className="midContainer bg-white p-4 rounded-4 shadow-2xl" >
        <div className="logo-container text-center mb-4">
          Authentication
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default LayoutCenter