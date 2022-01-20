const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Blog } = require('../db/models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id).catch((error) => next(error))

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeDatabaseError') {
    return res.status(500).send({ error: error.message })
  } else if (error.name === 'SequelizeValidationError') {
    return res.status(500).send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    })
  } else if (error.message === 'access denied') {
    res.status(401).json({ error: 'token missing' })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
  } else {
    throw Error('missing token!!')
  }
  next()
}

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.disabled === true) {
      req.logout()
      res.status(401).json({ message: 'You are unauthorized' })
    }
    next()
  } else {
    res.status(401).json({ message: 'route forbidden' })
  }
}

// const isAdmin = (req, res, next) => {}

module.exports = { blogFinder, unknownEndpoint, errorHandler, tokenExtractor, isAuth }
