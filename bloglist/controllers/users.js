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
    try{
        const savedUser = await newUser.save()
        response.json(savedUser)
    }
    catch(exception){
        //next(exception)
        response.json({Error: "Cannot save the new user"})
    }
})

module.exports = usersRouter