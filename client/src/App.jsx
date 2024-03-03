import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import Login from "./pages/Login"
import Registeration from "./pages/Registeration"
import axios from "axios"
import AccountNav from "./components/AccountNav"

axios.defaults.baseURL = 'http://localhost:3003'
axios.defaults.withCredentials = true

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/"  element={<Home />}/>
      <Route path="/login"  element={<Login />}/>
      <Route path="/register"  element={<Registeration />}/>
      <Route path="/account"  element={<AccountNav />}/>
      <Route path="/account/bookings"  element={<AccountNav />}/>
      <Route path="/account/places"  element={<AccountNav />}/>
    </Routes>
    </>
  )
}

export default App