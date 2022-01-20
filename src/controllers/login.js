const router = require('express').Router()
const passport = require('../auth/passport')

router.post('/', passport.authenticate('local'), async (req, res) => {
  res.end()
})

router.delete('/', async (req, res, next) => {
  req.logout()
  req.session.save((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

module.exports = router
