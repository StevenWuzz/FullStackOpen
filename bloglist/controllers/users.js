const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    if(request.body.password.length < 3){
        return response.status(400).json({error: 'Password is too short'})
    }

    const passwordHash = await bcrypt.hash(request.body.password, 10)
    const newUser = new User({
        username: request.body.username,
        passwordHash,
        name: request.body.name
    })
    const savedUser = await newUser.save()
    return response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const returnedUser = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})
    return response.json(returnedUser)
})

module.exports = usersRouter