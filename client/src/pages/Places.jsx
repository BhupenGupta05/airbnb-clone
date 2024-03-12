import { Link } from "react-router-dom"
import AccountNav from "../components/AccountNav"
import { useEffect, useState } from "react"
import axios from "axios"

const Places = () => {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    const fetchPlaces = async () => {
      const storedToken = window.localStorage.getItem("token");
      const{data} = await axios.get('/user-places', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      setPlaces(data)
    }

    fetchPlaces()
  }, [])
  return (
    <div>
      <AccountNav />
        <div className="text-center">
            <Link to={'/account/places/new'} className="inline-flex items-center gap-2 bg-primary text-white rounded-full py-2 px-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={16} height={16}>
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" fill="white"/>
            </svg>
                Add new place
            </Link>
        </div>
        <div className="mt-4">
          {places.length > 0 && places.map(place => (
              <Link to={`/account/places/${place.id}`} key={place.id} className="flex gap-4 bg-gray-200 rounded-2xl cursor-pointer p-4">
                <div className="flex w-32 h-32 bg-gray-100 grow shrink-0">
                  {place.photos.length > 0 && (
                    <img src={`http://localhost:3003/uploads/${place.photos[0]}`} className='object-cover' alt="" />
                  )}
                </div>
                <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
                </div>
                </Link>
            ))
          }
        </div>
    </div>
  )
}

export default Places