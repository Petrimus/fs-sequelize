var bcrypt = require('bcrypt')
const User = require('../db/models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const veryfyCallback = async (username, password, done) => {
  const user = await User.findOne({
    where: {
      username: username,
    },
  })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return done(null, false)
  }

  return done(null, user)
}

passport.use(new LocalStrategy(veryfyCallback))

passport.serializeUser((user, done) => {
  console.log('serielized user: ', user)
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, { username: user.username, id: user.id, disabled: user.disabled, isAdmin: user.isAdmin })
    })
    .catch((err) => {
      return done(err)
    })
})

module.exports = passport
