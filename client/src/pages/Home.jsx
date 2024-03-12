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
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-4">
      {places.length > 0 && places.map(place => (
        <Link to={`/place/${place.id}`} key={place.id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={`http://localhost:3003/uploads/${place.photos?.[0]}`} alt=""/>
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Home