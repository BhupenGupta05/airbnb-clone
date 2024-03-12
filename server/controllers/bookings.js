const bookingsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Booking = require('../models/booking')

bookingsRouter.get('/', middleware.getTokenFrom, middleware.userExtractor, async (req, res) => {
    const user = req.user
    res.json(await Booking.find({user: user.id}).populate('place'))
})

bookingsRouter.get('/:id', middleware.getTokenFrom, middleware.userExtractor, async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    try {
        const booking = await Booking.findOne({ _id: id, user: user.id }).populate('place');

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

bookingsRouter.post('/', middleware.getTokenFrom, middleware.userExtractor, async (req, res) => {
    try {
        const user = req.user
        const {place, checkIn, checkOut, numberOfGuests, name, phone, price} = req.body
    
        const bookingData = await Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, user: user.id, price
        })
        
        res.json(bookingData)
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
})

module.exports = bookingsRouter