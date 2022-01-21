const { isAuth } = require('../utils/middleware')
const router = require('express').Router()
const { Readinglist } = require('../db/models')

router.post('/', isAuth, async (req, res) => {
  const { blogId, userId } = req.body
  console.log('userId: ', userId)

  if (!blogId || !userId) {
    return res.status(400).send({ error: 'User or blog id is missing' })
  }

  const reading = await Readinglist.create({ blogId, userId })
  return res.json(reading)
})

router.put('/:id', isAuth, async (req, res) => {
  const id = req.params.id
  const { read } = req.body

  const readinglist = await Readinglist.findByPk(id)

  if (readinglist) {
    readinglist.read = read
    await readinglist.save()
    res.json(readinglist)
  } else {
    return res.status(404).end()
  }
})

module.exports = router
