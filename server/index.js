const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = express()
const User = require('./models/user')

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
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

app.get('/test', (req, res) => {
    res.json('test ok')
})

app.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const user = new User({
        name,
        email,
        passwordHash,
    })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
    
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    
    const passwordCorrect = user === null
    ? false
    : bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    email: user.email,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET)

  res.status(200).send({ token, name: user.name, email: user.email })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })