import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import Login from "./pages/Login"
import Registeration from "./pages/Registeration"
import axios from "axios"
import PlaceForm from "./pages/PlaceForm"
import Account from "./pages/Account"
import Places from "./pages/Places"
import Place from "./pages/Place"
import Bookings from "./pages/Bookings"
import Booking from "./pages/Booking"

// axios.defaults.baseURL = 'http://locahost:3003'
axios.defaults.baseURL = 'https://airbnb-backend-gl8k.onrender.com'
axios.defaults.headers.common['Authorization'] = null
axios.defaults.withCredentials = true

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/"  element={<Home />}/>
      <Route path="/login"  element={<Login />}/>
      <Route path="/register"  element={<Registeration />}/>
      <Route path="/account"  element={<Account />}/>
      <Route path="/account/bookings"  element={<Bookings />}/>
      <Route path="/account/bookings/:id"  element={<Booking />}/>
      <Route path="/account/places"  element={<Places />}/>
      <Route path="/account/places/:id"  element={<PlaceForm />}/>
      <Route path="/account/places/new"  element={<PlaceForm />}/>
      <Route path="/place/:id"  element={<Place />}/>
    </Routes>
    </>
  )
}

export default App