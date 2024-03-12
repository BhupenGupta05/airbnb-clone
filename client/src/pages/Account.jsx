import { useContext } from "react"
import { UserContext } from "../UserContext"
import { useNavigate, useParams } from "react-router-dom"
import Places from "./Places"
import AccountNav from "../components/AccountNav"

const Account = () => {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    let {subpage} = useParams()
       
    if(subpage === undefined) {
        subpage = 'profile'
    }

    const handleLogout = async () => {
        window.localStorage.removeItem('token')
        setUser(null)
        navigate('/')
    }

  return (
    <div>
        <AccountNav />
        {subpage === 'profile' && (
            <div className="text-center max-w-sm mx-auto">
                Logged in as {user?.name} ({user?.email})
                <button onClick={handleLogout} className="primary max-w-sm mt-2">Logout</button>
            </div>
        )}

        {subpage === 'places' && (
            <Places />
        )}
    </div>
  )
}

export default Account