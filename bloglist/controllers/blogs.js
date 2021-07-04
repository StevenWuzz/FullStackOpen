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
    console.log(body)

    if(!(body.title) && !(body.url)){
      return response.status(400).end()
    }

    if(!body.likes){
      request.body.likes = 0
    }  
    
    const user = request.user
    
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

  const requestedBlogId = request.params.id
  const blog = await Blog.findById(requestedBlogId)

  const requestedUserId = decodedToken.id
  const correctUserId = blog.user._id

  if(requestedUserId.toString() === correctUserId.toString()){
    await Blog.findByIdAndRemove(requestedBlogId)

    const user = await User.findById(requestedUserId)
    user.blogs = user.blogs.filter(id => id === requestedBlogId)
    const newUserInfo = {
      blogs: user.blogs,
      username: user.username,
      name: user.name,
    }
    await User.findByIdAndUpdate(requestedUserId, newUserInfo, {new: true})

    response.send(`Blog with id ${requestedBlogId} has been successfully deleted`)
  }
  else{
    response.status(400).send('User is unauthorized to delete the blog')
  }
})

module.exports = blogsRouter