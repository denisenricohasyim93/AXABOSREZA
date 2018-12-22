var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken');
const fetch = require('node-fetch')
var { ERPNEXT_API_BASE_URL, jsonwebtokensecret } = require('../credentials')

router.get('/', function (req, res) {
    res.send({ status: 200, message: 'Welcome to DB User Management Service - v0 - Login API ' })
})

router.post('/', function (req, res) {
    fetch(ERPNEXT_API_BASE_URL + '/api/method/login', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "usr": req.body.email,
            "pwd": req.body.password
        })
    })
        .then(response => {
            response.json()
                .then(json => {
                    if (json.message === "Logged In") {
                        var token = jwt.sign({}, jsonwebtokensecret);
                        res.send({ status: 200, message: 'Login Berhasil', token: token, json : json})
                    } else {
                        res.send({ status: 500, message: 'Login Gagal'})
                    }
                })
                .catch((err) => {
                    res.send({ 
                        status: 501, 
                        message: 'Login Gagal' 
                        // err : err 
                    })
                })
        })
        .catch((err) => {
            res.send({
                status: 502,
                message: 'Login Gagal'
                // err: err
            })
        })
})

module.exports = router