import {differenceInCalendarDays} from 'date-fns'
import { useState, useContext, useEffect } from "react"
import {UserContext} from '../UserContext'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(user) {
            setName(user.name)
        }
    }, [user])

    let numberOfNights = 0
    if (checkIn && checkOut) {
      numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    const bookPlace = async () => { 
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, 
            name, phone, place: place.id,
            price: numberOfNights * place.price})
        const bookingId = response.data.id
        navigate(`/account/bookings/${bookingId}`)
    }
  return (
    <div className="bg-white rounded-2xl p-4">
                    <div className="text-2xl text-center">
                    Price: ${place.price} per night
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className="flex">
                            <div className="py-3 px-4">
                                <label>Check In</label>
                                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                            </div>
                            
                            <div className="py-3 px-4 border-l">
                                <label>Check Out</label>
                                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                            </div>
                        </div>

                        <div className="py-3 px-4 border-l">
                            <label>Number of guests</label>
                            <input type="number" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} />
                        </div>

                        {numberOfNights > 0 && (
                            <div className="py-3 px-4 border-t">
                            <label>Your full name:</label>
                            <input type="text"
                                   value={name}
                                   onChange={ev => setName(ev.target.value)}/>
                            <label>Phone number:</label>
                            <input type="tel"
                                   value={phone}
                                   onChange={ev => setPhone(ev.target.value)}/>
                          </div>
                        )}
                    </div>

                       
                    
                    <button onClick={bookPlace} className="primary mt-4">
                    Book this place
                    {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price}</span>
                    )}
                    </button>
                </div>
  )
}

export default BookingWidget