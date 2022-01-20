const app = require('./src/app')
const http = require('http')
const config = require('./src/utils/config')
const logger = require('./src/utils/logger')
const { connectToDatabase } = require('./src/db/connections')

const server = http.createServer(app)

const start = async () => {
  await connectToDatabase()
  server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
}

start()
