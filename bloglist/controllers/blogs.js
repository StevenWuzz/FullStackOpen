const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middlewares = require('../utils/middlewares')

blogsRouter.get('/', async (request, response) => {
    const returnedBlogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    return response.json(returnedBlogs)
})

blogsRouter.post('/', middlewares.tokenExtractor, middlewares.userExtractor, async (request, response) => {
    body = request.body

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

blogsRouter.delete('/:id', middlewares.tokenExtractor, middlewares.userExtractor, async(request, response) => {

  const requestedBlogId = request.params.id
  const blog = await Blog.findById(requestedBlogId)
  
  const user = request.user
  const requestedUserId = user._id
  const correctUserId = blog.user._id

  if(requestedUserId.toString() === correctUserId.toString()){
    await Blog.findByIdAndRemove(requestedBlogId)

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