import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import './index.css'
import Homescreen from './screens/Homescreen.jsx';
import Loginscreen from './screens/Loginscreen.jsx';
import Registerscreen from './screens/Registerscreen.jsx';
import store from './store.js'
import { Provider } from 'react-redux'
import Privateroutes from './components/Privateroutes.jsx';
import Profilescreen from './screens/Profilescreen.jsx';


import AdminHomeScreen from './screens/Adminscreen/Homescreen.jsx'
import AdminRegisterScreen from './screens/Adminscreen/Registerscreen.jsx'
import LoginScreen from './screens/Adminscreen/Loginscreen.jsx';
import UserScreen from './screens/Adminscreen/UserScreen.jsx';
import AdminProfilescreen from './screens/Adminscreen/AdminProfilescreen.jsx';
import AdminPrivateRoutes from './screens/Adminscreen/AdminPrivateRoutes.jsx';


const router = createBrowserRouter(
   createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path = '/' element={<Homescreen/>} />
      <Route  path= '/login' element={<Loginscreen/>} />
      <Route  path= '/register' element={<Registerscreen/>} />
      <Route path='' element={<Privateroutes/>}>
      <Route  path= '/profile' element={<Profilescreen/>} />
      </Route>

      <Route path='/admin' element={ <AdminHomeScreen /> } />
      <Route path='/admin/register' element={ <AdminRegisterScreen /> } />
      <Route path='/admin/login' element={ <LoginScreen /> } />
      <Route path = '' element = {<AdminPrivateRoutes/>}>
      <Route  path='/admin/manage-users' element = { <UserScreen/>} />
      <Route path='/admin/profile' element={ <AdminProfilescreen /> } />
      </Route>


    </Route>
   )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
  </Provider>
)
