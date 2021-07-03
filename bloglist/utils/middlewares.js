const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    const token = authorization && authorization.startsWith("Bearer ")? 
    authorization.substring(7) : null
    request.token = token
    next()
}

module.exports = tokenExtractor