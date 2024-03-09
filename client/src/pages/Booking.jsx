import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Booking = () => {
    const {id} = useParams()
    const [booking, setBooking] = useState(null)

    useEffect(() => {
        const fetchBooking = async () => {
            const response = await axios.get('/bookings')
            const singleBooking = response.data.find(({bookingId}) => bookingId === id )

            if(singleBooking) {
                setBooking(singleBooking)
            }
        }

        if(id) {
            fetchBooking()
        }
    }, [])

    if(!booking) {
        return ''
    }
  return (
    <div className="my-8">
        <h1 className="text-3xl">{booking.place.title}</h1>
        <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
            <h2 className="text-xl">Your booking information</h2>
        </div>
        <Location className='my-2' />
    </div>
  )
}

export default Booking