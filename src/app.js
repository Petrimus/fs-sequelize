const express = require('express')
const cors = require('cors')
require('express-async-errors')
const blogsRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/author')
const readinglistRouter = require('./controllers/readinglist')
const middleware = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglist', readinglistRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
