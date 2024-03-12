const jwt = require('jsonwebtoken')
const User = require('../models/user')

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

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

module.exports = {
    getTokenFrom, userExtractor, tokenExtractor, unknownEndpoint
}