import axios from "axios"
import { useEffect, useState } from "react"
import AccountNav from "../components/AccountNav"
import PlaceImg from "../components/PlaceImg"
import { Link } from "react-router-dom"
import BookingDates from "../components/BookingDates"

const Bookings = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const fetchBookings = async () => {
            const storedToken = window.localStorage.getItem("token");
            const {data} = await axios.get('/bookings', {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            })
            setBookings(data)
        }

        fetchBookings()
    }, [])
  return (
    <div className="mx-4">
        <AccountNav />
        {bookings.length > 0 && bookings.map(booking => (
            <Link key={booking.id} to={`/account/bookings/${booking.id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                <div className="w-48">
                    <PlaceImg place={booking.place} />
                </div>

                <div className="py-3 pr-3 grow">
                    <h2 className="text-xl">{booking.place.title}</h2>

                    <div className="text-xl">
                        <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />
                        
                        <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={20} height={20}>
                            <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"/>
                        </svg>
                            <span className="text-2xl">
                                Total price: ${booking.price}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default Bookings