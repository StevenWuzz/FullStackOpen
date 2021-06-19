const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require("../models/blog")

const initialBlog =
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

const newBlog = [
    {
        title: "Beautiful Life",
        author: "Kevin Halim",
        url: "http://kevinhalim.com",
        likes: 100
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = initialBlog.map(blog => new Blog(blog))
    const savePromiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(savePromiseArray)
})

describe('Tests for GET request', () => {
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
    test('The number of blogs is increased by one', async () => {
        await api.post('/api/blogs').send(newBlog)
        response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlog.length + 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})



