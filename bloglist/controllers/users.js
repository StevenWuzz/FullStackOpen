const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const passwordHash = await bcrypt.hash(request.body.password, 10)
    const newUser = new User({
        username: request.body.username,
        passwordHash,
        name: request.body.name
    })
    const savedUser = await newUser.save()
    response.json(savedUser)
})

module.exports = usersRouter