import { Outlet } from 'react-router-dom'
import { Header } from './Header'

const LayoutCenter = () => {
  return (
   <>
   <Header />
     <main className="container">
         <Outlet />
     </main>
   </>
  )
}

export default LayoutCenter