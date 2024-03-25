const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const middleware = require('./utils/middleware')
const cookieParser = require('cookie-parser')
const registerRouter = require('./controllers/register')
const loginRouter = require('./controllers/login')
const profileRouter = require('./controllers/profile')
const uploadLinkRouter = require('./controllers/uploadByLink')
const uploadDeviceRouter = require('./controllers/upload')
const placesRouter = require('./controllers/places')
const userPlacesRouter = require('./controllers/user-places')
const bookingsRouter = require('./controllers/bookings')

app.use(cors({
    origin: 'https://airbnb-backend-gl8k.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    exposedHeaders: ['set-cookie']
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://airbnb-backend-gl8k.onrender.com')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})


console.log('connecting to', process.env.MONGODB_URL)
mongoose.set('strictQuery', false)


mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(express.static('dist'))
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))

app.get('/test', (req, res) => {
    res.json('test ok')
})

app.use(middleware.tokenExtractor)

// Apply other routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// VIEW USERS' DETAILS ON PROFILE PAGE
app.use('/profile', middleware.getTokenFrom, middleware.userExtractor, profileRouter);
app.use('/upload-by-link', uploadLinkRouter);
app.use('/upload', uploadDeviceRouter);
app.use('/places', placesRouter);
app.use('/user-places', userPlacesRouter)
app.use('/bookings', bookingsRouter);


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })