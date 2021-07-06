const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require("../models/blog")

const initialBlogs =
[
    {
        title: "A Day in a Life of a CS Student",
        author: "Steven Hans Limantoro",
        url: "http://steven.csdiary.com",
        likes: 150
    },
    {
        title: "Good Life",
        author: "Felix Huang",
        url: "http://huang.blog.com",
        likes: 50
    }
]

const newBlog =
{
    title: "Beautiful Life",
    author: "Kevin Halim",
    url: "http://kevinhalim.com",
    likes: 100
}

const newBlogMissingLikes = 
{
    title: "Beautiful Life",
    author: "Kevin Halim",
    url: "http://kevinhalim.com",
}

const newBlogMissingUrlTitle = 
{
    author: "Sergio Vieri",
    likes: 200
}


describe('Tests for GET request', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        const blogObjects = initialBlogs.map(blog => new Blog(blog))
        const savePromiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(savePromiseArray)
    })

    test('Blogs are returned in the correct amount', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(2)
    })
    
    test('Blogs are returned in the correct format', async () => {
        await api.get('/api/blogs')
        .expect('Content-Type', /application\/json/)
    })

    test('Returned blogs have unique identifier called id', async () => {
        const response = await api.get('/api/blogs')
        response.body.map(blog => expect(blog.id).toBeDefined())
    })
})

describe('Tests for POST request', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
    })

    test('The number of blogs is increased by one', async () => {
        await api.post('/api/blogs').send(newBlog)
        response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(1)
    })

    test('If likes is missing, then it defaults to 0', async () => {
        await api.post('/api/blogs').send(newBlogMissingLikes)
        response = await api.get('/api/blogs')
        expect(response.body[0].likes).toEqual(0)
    })

    test('If URL and Titles are missing, then return status code 400', async () => {
        await api.post('/api/blogs')
        .send(newBlogMissingUrlTitle)
        .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})



