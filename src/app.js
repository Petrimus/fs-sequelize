const express = require('express')
const cors = require('cors')
require('express-async-errors')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const { sequelize } = require('./db/connections')
const passport = require('./auth/passport')
const { SECRET } = require('./utils/config')
const blogsRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/author')
const readinglistRouter = require('./controllers/readinglist')
const middleware = require('./utils/middleware')

const app = express()
const sessionStore = new SequelizeStore({
  db: sequelize
})

const sess = {
  secret: SECRET,
  cookie: { maxAge: 3600000 },
  store: sessionStore,
  saveUninitialized: true,
  resave: false,

}

/* if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
} */

app.use(session(sess))
sessionStore.sync()
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log(req.session)
  console.log(req.user)
  next()
})

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
