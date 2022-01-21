const router = require('express').Router()
const passport = require('../auth/passport')

router.post('/', passport.authenticate('local'), async (req, res) => {
  res.end()
})

router.delete('/', async (req, res) => {
  req.logout()
  res.send({ message: 'logged out' })
})

module.exports = router
