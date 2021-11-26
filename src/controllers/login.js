const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../utils/config')
const { User } = require('../db/models/')

router.post('/', async (request, response) => {
  console.log('secret: ', SECRET)
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  })

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
