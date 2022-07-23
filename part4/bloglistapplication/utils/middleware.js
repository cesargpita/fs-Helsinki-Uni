const jwt = require('jsonwebtoken')
const config = require('./config')
const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const userExtractor = (request, response, next) => {
  // code that extracts the token
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, config.SECRET)
    request.user = decodedToken.id
  } else {
    request.user = null
  }
  next()
}

module.exports = { tokenExtractor, userExtractor }