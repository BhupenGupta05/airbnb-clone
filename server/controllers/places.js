const placesRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Place = require('../models/place')

placesRouter.get('/', async (req, res) => {
    try {
        const places = await Place.find({});
        res.json(places);
    } catch (error) {
        console.error('Error fetching places:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

placesRouter.get('/:id', async (req, res) => {
    const {id} = req.params
    res.json(await Place.findById(id))
})

placesRouter.post('/', middleware.getTokenFrom, middleware.userExtractor,async (req, res) => {
    try {
        const user = req.user
        const place = new Place({
          owner: user.id,
          title, address, description, 
          perks, extraInfo, photos, 
          checkIn, checkOut, maxGuests, price
        })
        const savedPlace = await place.save()
        res.status(201).json(savedPlace)
    } catch (error) {
      res.status(500).json({error: 'Internal server error'})
    }
})

placesRouter.put('/', middleware.getTokenFrom, middleware.userExtractor, async (req, res) => {
    try {
        const user = req.user
        const {id, title, address, description, perks, extraInfo, photos, checkIn, checkOut, maxGuests, price} = req.body
    
        const existingPlace = await Place.findById(id)
    
        if(user.id === existingPlace.owner.toString()) {
          existingPlace.set({
            title, address, description, 
            perks, extraInfo, photos, checkIn, 
            checkOut, maxGuests, price
          })
    
          const savedPlace = await existingPlace.save()
          res.status(200).json(savedPlace)
        }
    } catch (error) {
      res.status(500).json({error: 'Internal server error'})
    }
})
  
module.exports = placesRouter