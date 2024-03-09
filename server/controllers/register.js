const bcrypt = require('bcrypt')
const registerRouter = require('express').Router()
const User = require('../models/user')

registerRouter.post('/', async (req, res) => {
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
  
module.exports = registerRouter