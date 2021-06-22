const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const returnedBlogs = await Blog.find({}).populate('user')
    return response.json(returnedBlogs)
})

blogsRouter.post('/', async (request, response) => {
    body = request.body

    if(!(body.title) && !(body.url)){
      return response.status(400).end()
    }

    if(!body.likes){
      request.body.likes = 0
    }

    const user = await User.findById(body.userId)
    
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.string,
      likes: body.likes,
      user: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  })

module.exports = blogsRouter