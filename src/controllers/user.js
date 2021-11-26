const bcrypt = require('bcrypt')
const router = require('express').Router()

const  { User } = require('../db/models')
const  { Blog } = require('../db/models')
const { tokenExtractor } = require('../utils/middleware')


router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const body = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = await User.create({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  res.json(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', tokenExtractor, async(req, res) => {
  const user = await User.findByUsername(req.params.username )
  user.username = req.params.username
  await user.save()
  res.status(204).json(user)

})


module.exports = router
