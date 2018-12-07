var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.send({ status: 200, message: 'Welcome to DB User Management Service - v0 - Register API ' })
})

module.exports = router