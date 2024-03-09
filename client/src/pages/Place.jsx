import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingWidget from "../components/BookingWidget"
import PlaceGallery from "../components/PlaceGallery"
import Location from "../components/Location"

const Place = () => {
    const {id} = useParams()
    const [place, setPlace] = useState(null)
    const [showPhotos, setShowPhotos] = useState(false)

    useEffect(() => {
        const fetchPlace = async () => {
            const {data} = await axios.get(`/places/${id}`)
            setPlace(data)
        }

        if(!id) {
            return
        }
        fetchPlace()

    }, [id])

    if(!place) return ''

    

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
        <h1 className="text-3xl">{place?.title}</h1>
        <Location>
            {place.address}
        </Location>
        <PlaceGallery place={place} />

        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
                <div className="my-4">
                    <h2 className="font-semibold text-2xl">Description</h2>
                    {place.description}
                </div>
                Check In : {place.checkIn}<br/>
                Check Out : {place.checkOut}<br/>
                Max no. of guests : {place.maxGuests}
            </div>

            <div>
                <BookingWidget place={place} />
            </div>
        </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div className="my-4">
            <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="text-sm text-gray-700 leading-5 mb-4 mt-2">{place.extraInfo}</div>
        </div>
        
        
        
        
    </div>
  )
}

export default Place