const router = require('express').Router()
const sequelize = require('sequelize')

const Blog = require('../db/models/blog')

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('sum', sequelize.col('likes')), 'total_likes'],
      [sequelize.fn('count', sequelize.col('author')), 'total_blogs'],
    ],
    group: ['author', 'likes'],
    order: [['likes', 'DESC']],
  })

  res.json(authors)
})

module.exports = router
