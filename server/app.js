const express = require("express")
const fileUpload = require("express-fileupload")
const app = express()

const config = require("./utils/config")
const logger = require("./utils/logger")

const peopleRouter = require("./routers/people")

const middleware = require("./utils/middleware")

app.use('/uploads', express.static('uploads'))

const cors = require('cors')

app.use(fileUpload())

app.use(cors())

app.use(express.json())

// app.use(express.static('build'))

app.use("/api",peopleRouter)

app.use(middleware.unknownEndpoint)


app.use(middleware.errorHandler)

const PORT = config.PORT

app.listen(PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)
})