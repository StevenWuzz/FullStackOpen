const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    
    const user = await User.findOne({username: body.username})
    if(user === null){
        return response.status(401).json({error: "Username can't be found"})
    }
    if(!bcrypt.compare(body.password, user.passwordHash)){
        return response.status(401).json({error: "Password does not match"})
    }
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    response.status(200).json({
        token,
        username: user.username,
        name: user.name
    })
})

module.exports = loginRouter
