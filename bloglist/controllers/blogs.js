const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const returnedBlogs = await Blog.find({}).populate('user', {username: 1, name: 1})
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
    
    const token = request.token
    if(token === null){
      return response.status(401).json({error: "Token can't be found"})
    }
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!decodedToken){
      return response.status(401).json({error: "Token can't be verified or decoded"})
    }
    
    const user = await User.findById(decodedToken.id)
    
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
    return response.json(savedBlog)
    
  })

blogsRouter.delete('/:id', async(request, response) => {
  const token = request.token
  if(token === null){
    return response.status(401).json({error: "Token can't be found"})
  }
    
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!decodedToken){
    return response.status(401).json({error: "Token can't be verified or decoded"})
  }

  const params = request.params
  await Blog.findByIdAndRemove(params.id)
  response.send(`Blog with id ${params.id} has been successfully deleted`)
})

module.exports = blogsRouter