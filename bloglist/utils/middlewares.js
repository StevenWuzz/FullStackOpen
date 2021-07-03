const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    const token = authorization && authorization.startsWith("Bearer ")? 
    authorization.substring(7) : null
    request.token = token
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
    errorHandler
}