const mongoose = require('mongoose')
const config = require("../utils/config")
const logger = require("../utils/logger")

const url = config.MONGODB_URI

logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
      logger.info('connected to MongoDB')
  })
  .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minlength:5,
    required:true
  },
  unvan:{
    type:Date,
    required:true
  },
  no:{
        type:Number,
        required:true
  }
})

module.exports = mongoose.model('Person', personSchema)