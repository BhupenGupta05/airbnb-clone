import { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import axios from "axios"

const AccountNav = () => {
    const {user, setUser} = useContext(UserContext)
    const {pathname} = useLocation()
    const navigate = useNavigate()

    let subpage = pathname?.split('/')[2]

    if(subpage === undefined) {
        subpage = 'profile'
    }

    if(!user) {
        navigate('/login')
    }

    const selectClasses = (type=undefined) => {
        let classes = 'py-2 px-6 rounded-full'
        if(type === subpage) {
            classes += ' bg-primary text-white'
        } else {
            classes += ' bg-gray-300'
        }
        return classes
    }
    
    const logout = async () => {
        try {
            await axios.post('/logout')
            navigate('/')
            setUser(null)

          } catch (error) {
            console.error("Error during logout:", error)
            navigate('/login')
            setUser(null)
          }
    }

  return (
    <div>
        <nav className="w-full flex justify-center gap-4 mt-8 mb-8">
            <Link className={selectClasses('profile')} to={'/account'}>My profile</Link>
            <Link className={selectClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
            <Link className={selectClasses('places')} to={'/account/places'}>My accomodations</Link>
        </nav>
        {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
    </div>
  )
}

export default AccountNav