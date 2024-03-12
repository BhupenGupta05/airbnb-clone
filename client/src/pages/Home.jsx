import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const Home = () => {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    const fetchAllPlaces = async () => {
      const {data} = await axios.get('/places')
      setPlaces(data)
    }

    fetchAllPlaces()
  }, [])
  return (
    <div className="mt-8 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-4">
      {places.length > 0 && places.map(place => (
        <Link to={`/place/${place.id}`} key={place.id}>
          <div className="bg-gray-500 mb-2 rounded-2xl overflow-hidden">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover w-full h-40 sm:h-48 lg:h-56" src={`http://localhost:3003/uploads/${place.photos?.[0]}`} alt=""/>
            )}
          </div>
          <h2 className=" font-semibold text-md sm:text-md lg:text-lg xl:font-semibold xl:text-2xl">{place.address}</h2>
          <h3 className="text-xs sm:text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1 text-sm sm:text-base">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Home