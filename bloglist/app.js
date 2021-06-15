const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require("./controllers/blogs")

const app = express()
app.use("/api/blogs", blogsRouter)
app.use(cors())
app.use(express.json())

const mongoURL = "mongodb+srv://Steven:StevenHans@cluster0.s52wk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => console.log("Connected to MongoDB"))
.catch(error => console.log("Error connecting to MongoDB: ", error.message))

module.exports = app