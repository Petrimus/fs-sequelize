const bcrypt = require('bcrypt')
const router = require('express').Router()
// const passport = require('../auth/passport')
const { SALT_ROUNDS } = require('../utils/config')


const { User } = require('../db/models/')

router.post('/', async (req, res) => {
  const body = req.body

  const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS)

  const user = await User.create({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  res.json(user)
})

module.exports = router
