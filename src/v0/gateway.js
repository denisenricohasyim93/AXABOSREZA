var express = require('express')
var router = express.Router()
var login = require('./services/login')
var register = require('./services/register')
var changePassword = require('./services/changePassword')
var forgetPassword = require('./services/forgetPassword')
var userList = require('./services/userList')

router.get('/', function (req, res) {
    res.send({status : 200, message : 'Welcome to DB User Management Service Gateway v0'})
})

router.use('/login', login)
router.use('/register', register)
router.use('/changePassword', changePassword)
router.use('/forgetPassword', forgetPassword)
router.use('/userList', userList)

module.exports = router