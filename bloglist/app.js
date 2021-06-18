const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require("./controllers/blogs")
const mongoURL = require("./utils/config").MONGODB_URI

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)

module.exports = app