const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const multer = require('multer')
const imageDownloader = require('image-downloader')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const app = express()
const User = require('./models/user')
const Place = require('./models/place')
const Booking = require('./models/booking')
const cookieParser = require('cookie-parser')
const registerRouter = require('./controllers/register')
const loginRouter = require('./controllers/login')

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    exposedHeaders: ['set-cookie']
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
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
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))

app.get('/test', (req, res) => {
    res.json('test ok')
})

const getTokenFrom = (req, res, next) => {
  const authorization = req.get('authorization')  
  if (authorization && authorization.startsWith('Bearer ')) {    
    const token = authorization.replace('Bearer ', '')  
    req.token = token
  } else {
    req.token = null
  }
  next()
}

const tokenExtractor = (req, res, next) => {
  const token = req.token

    if (token) {
        req.token = token;
    } else {
        req.token = null;
    }

    next();
}

const userExtractor = async (req, res, next) => {
  const token = req.token
  console.log('token:',token);

  if (!token) {
    return res.status(401).json({ error: 'token missing' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    console.log('decodedtoken:',decodedToken);

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
      return res.status(401).json({ error: 'user not found' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' })
  }
}

app.use(tokenExtractor)

// Apply other routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);


// Apply tokenExtractor and userExtractor only to routes that require a token
app.use(['/user-places', '/bookings'], getTokenFrom, userExtractor);


// app.post('/register', async (req, res) => {
//     try {
//         const {name, email, password} = req.body
    
//     const saltRounds = 10
//     const passwordHash = await bcrypt.hash(password, saltRounds)
    
//     const user = new User({
//         name,
//         email,
//         passwordHash,
//     })

//   const savedUser = await user.save()

//   res.status(201).json(savedUser)
//     } catch (error) {
//         res.status(500).json({error: 'Internal server error'})
//     }
    
// })

// app.post('/login', async (req, res) => {
//     const {email, password} = req.body

//     const user = await User.findOne({email})
    
//     const passwordCorrect = user === null
//     ? false
//     : bcrypt.compare(password, user.passwordHash)

//   if (!(user && passwordCorrect)) {
//     return res.status(401).json({
//       error: 'invalid username or password'
//     })
//   }

//   const userForToken = {
//     email: user.email,
//     id: user.id,
//   }

//   const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: 60*60 })

//   res.status(200).send({ token, name: user.name, email: user.email })
// })

// VIEW USERS' DETAILS ON PROFILE PAGE
app.get('/profile', getTokenFrom, userExtractor, async (req, res) => {
  const user = req.user
  console.log('User: ', user);

  if(user) {
    res.json(user)
} else {
    res.status(401).json({ error: 'User not found' })
}
})

// UPLOADING IMAGES USING LINK
app.post('/upload-by-link', async (req,res) => {
  const {link} = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: __dirname+'/uploads/' +newName,
  })
  res.json(newName)
})

// UPLOADING IMAGES USING DEVICE
const photosMiddleware = multer({dest:'uploads/'})
app.post('/upload', photosMiddleware.array('photos', 100), async (req,res) => {
  const uploadedFiles = []

  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname} = req.files[i]
    const parts = originalname.split('.')
    const ext = parts[parts.length-1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace('uploads\\', ''))
    console.log(uploadedFiles);
  }
  res.json(uploadedFiles)
})

app.get('/user-places', async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  try {
    const userPlaces = await Place.find({ owner: user.id });
    res.json(userPlaces);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ADDING A PLACE TO ACCOMODATIONS
app.post('/places', getTokenFrom, userExtractor ,async (req, res) => {
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

// UPDATING A SEPCIFIC PLACE ON ACCOMODATIONS 
app.put('/places', getTokenFrom, userExtractor ,async (req, res) => {
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

// FETCH A SPECIFIC PLACE ON ACCOMODATIONS
app.get('/places/:id', async (req, res) =>{
  const {id} = req.params
  res.json(await Place.findById(id))
})


// FEETCH ALL PLACES ON HOME PAGE
app.get('/places', async (req, res) => {
  try {
    const places = await Place.find({});
    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/bookings', async (req, res) => {
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

app.get('/bookings', async (req, res) => {
  const user = req.user
    res.json(await Booking.find({user: user.id}).populate('place'))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })