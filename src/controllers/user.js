const bcrypt = require('bcrypt')
const router = require('express').Router()
const { Op } = require('sequelize')
const { User, Blog } = require('../db/models')
const { tokenExtractor } = require('../utils/middleware')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
    },
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
  let read = {
    [Op.in]: [true, false],
  }

  if (req.query.read) {
    read = req.query.read
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: [
      {
        model: Blog,
        attributes: { exclude: ['passwordHash'] },
      },
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        through: {
          attributes: ['id', 'read'],
          where: {
            read,
          },
        },
      },
    ],
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', tokenExtractor, async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  user.username = req.body.username
  await user.save()
  res.status(204).json(user)
})

module.exports = router
