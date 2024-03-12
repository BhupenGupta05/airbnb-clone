import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingDates from "../components/BookingDates"
import PlaceGallery from "../components/PlaceGallery"

const Booking = () => {
    const {id} = useParams()
    const [booking, setBooking] = useState(null)

    useEffect(() => {
        const fetchBooking = async () => {
            const storedToken = window.localStorage.getItem("token");
            const response = await axios.get(`/bookings/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            })
            setBooking(response.data)
        }

        fetchBooking()
    }, [id])

    if(!booking) {
        return 'loading...'
    }

  return (

<div className="my-8">
<h1 className="text-3xl">{booking.place.title}</h1>
<a className='flex items-center gap-1 font-semibold underline my-2' target="_blank" href={`https://maps.google.com/?q=${booking.place.address}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={10} height={10}>
             <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
         </svg>
             {booking.place.address}
         </a>
<div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
  <div>
    <h2 className="text-2xl mb-4">Your booking information:</h2>
    <BookingDates booking={booking} />
  </div>
  <div className="bg-primary p-6 text-white rounded-2xl">
    <div>Total price</div>
    <div className="text-3xl">${booking.price}</div>
  </div>
</div>
<PlaceGallery place={booking.place} />
</div>
  )
}

export default Booking