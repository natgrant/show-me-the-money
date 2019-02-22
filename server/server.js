const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const server = express()

server.use(cors('*'))

server.use(passport.initialize())
server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

server.use('/api/meetings', require('./routes/meetings'))
server.use('/api/users', require('./routes/users'))
server.use('/api/auth', require('./routes/auth'))

module.exports = server