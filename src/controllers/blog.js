const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog } = require('../db/models')
const { User } = require('../db/models')
const { blogFinder, tokenExtractor } = require('../utils/middleware')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    const searchTerm = `%${req.query.search.toLowerCase()}%`
    where.title = {
      [Op.iLike]: searchTerm,
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: { exclude: ['passwordhash'] },
    },
    where,
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const body = req.body

  if (!body.url || !body.title) {
    return res.status(400).send({ error: 'title or url missing' })
  }
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  return res.json(blog)
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    const blog = req.blog
    blog.likes = req.body.likes
    await blog.save()
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router
