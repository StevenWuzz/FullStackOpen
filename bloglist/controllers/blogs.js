const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const returnedBlogs = await Blog.find({})
    return response.json(returnedBlogs)
})

blogsRouter.post('/', (request, response) => {
    if(!request.body.likes){
      request.body.likes = 0
    }

    console.log(request.body)

    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

module.exports = blogsRouter