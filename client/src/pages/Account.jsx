import { useContext } from "react"
import { UserContext } from "../UserContext"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import Places from "./Places"
import profileService from '../services/fetchProfile'
import AccountNav from "../components/AccountNav"

const Account = () => {
    const {user, ready, setUser, setReady} = useContext(UserContext)
    const navigate = useNavigate()
    let {subpage} = useParams()

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!user && !ready) {
              try {
                // Use the fetchProfile function to fetch user details
                await profileService.fetchProfile();
                // setUser(userDetails); // No need to set user details here, as it's handled by the context
                setReady(true)
                
              } catch (error) {
                console.error("Error fetching user details:", error.message);
              }
            }
          };

          fetchUserDetails()

    }, [user, ready])
       
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