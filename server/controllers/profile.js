const profileRouter = require('express').Router()

profileRouter.get('/', async (req, res) => {
    const user = req.user
    console.log('User: ', user);
    
    if(user) {
        res.json(user)
    } else {
        res.status(401).json({ error: 'User not found' })
    }
})
  
module.exports = profileRouter