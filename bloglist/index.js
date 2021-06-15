const { v4: uuidv4 } = require('uuid');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    id: String
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoURL = "mongodb+srv://Steven:StevenHans@cluster0.s52wk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => console.log("Connected to MongoDB"))
.catch(error => console.log("Error connecting to MongoDB: ", error.message))

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then(blogs => response.json(blogs))
})

app.post('/api/blogs', (request, response) => {
    const newBlog = new Blog({...request.body, id: uuidv4()})
    newBlog.save().then(result => response.status(201).json(result))
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
