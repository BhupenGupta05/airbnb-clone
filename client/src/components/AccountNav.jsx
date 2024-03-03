import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

const AccountNav = () => {
    const {user, ready, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const {pathname} = useLocation()

    let subpage = pathname?.split('/')[2]

    if(subpage === undefined) {
        subpage = 'profile'
    }


    if(ready && !user) {
        navigate('/login')
    }

    if(!ready) {
        return 'loading...'
    }

    const selectClasses = (type=undefined) => {
        let classes = 'py-2 px-6 rounded-full'

        if(type === subpage) {
            classes += ' bg-primary text-white'
        } else {
            classes += ' bg-gray-200'
        }
        return classes
    }

    const logout = async () => {
        await axios.post('/logout')
        setUser(null)
        navigate('/')
    }
  return (
    <div>
        <nav className="flex justify-center gap-4 w-full mt-8 mb-8">
            <Link className={selectClasses('profile')} to={'/account'}>My profile</Link>
            <Link className={selectClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
            <Link className={selectClasses('places')} to={'/account/places'}>My accomodations</Link>
        </nav>
        {subpage === 'profile' && (
            <div className="text-center max-w-sm mx-auto">
                Logged in as {user.name} ({user.email})
                <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
        )}
    </div>
  )
}

export default AccountNav