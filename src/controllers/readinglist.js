const { tokenExtractor } = require('../utils/middleware')
const router = require('express').Router()
const { Readinglist } = require('../db/models')
// const { Model } = require('sequelize/types')

router.post('/', tokenExtractor, async (req, res) => {
  const { blogId, userId } = req.body
  console.log('userId: ', userId)

  if (!blogId || !userId) {
    return res.status(400).send({ error: 'User or blog id is missing' })
  }

  const reading = await Readinglist.create({ blogId, userId })
  return res.json(reading)
})

module.exports = router

