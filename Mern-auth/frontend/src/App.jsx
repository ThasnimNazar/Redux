import { Outlet,useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserHeader from './components/Header'
import AdminHeader from './components/adminComponents/Adminheader'

function App() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/admin');
  return (
    <>

    { isAdminPage ? <AdminHeader/> : <UserHeader/> }

    <ToastContainer />

    <Container className="my-2">
      
      <Outlet/>
      
    </Container>

  </>
  )
}
   
export default App