const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require("./controllers/blogs")

const Blog = require("./models/blog")

const mongoUrl = "mongodb+srv://Steven:StevenHans@cluster0.s52wk.mongodb.net/Bloglist?retryWrites=true&w=majority"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})