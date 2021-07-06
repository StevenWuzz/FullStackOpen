const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    const token = authorization && authorization.startsWith("Bearer ")? 
    authorization.substring(7) : null
    request.token = token
    next()
}

const userExtractor = async (request, response, next) => {
    const token = request.token
    if(token === null){
      return response.status(401).json({error: "Token can't be found"})
    }
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!decodedToken){
      return response.status(401).json({error: "Token can't be verified or decoded"})
    }

    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
}

const errorHandler = (error, request, response, next) => {
    if(error.name == "CastError") {
        return response.status(400).json({error: "Malformatted id"})
    }
    else if(error.name === "ValidationError") {
        return response.status(400).json({error: error.message})
    }
    else if(error.name === "JsonWebTokenError") {
        return response.status(401).json({error: 'Invalid token'})
    }
}

module.exports = {
    tokenExtractor,
    userExtractor,
    errorHandler
}