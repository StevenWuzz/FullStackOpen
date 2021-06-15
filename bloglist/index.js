const { v4: uuidv4 } = require('uuid')
const app = require("./app")
const Blog = require("./models/blog")

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
