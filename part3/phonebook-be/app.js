const morgan = require('morgan')

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const personsRouter = require('./controllers/persons')
const morganConfig = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(morganConfig))
app.use(express.static('build'))
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
