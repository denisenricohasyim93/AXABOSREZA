var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken');
const fetch = require('node-fetch')
var { ERPNEXT_API_BASE_URL, jsonwebtokensecret, erpNextCredentials } = require('../credentials')

router.get('/', function (req, res) {
    res.send({status : 200, message : 'Welcome to DB User Management Service - v0 - Change Password API '})
})

router.post('/', function (req, res) {
    if (req.body.email && req.body.new_password && req.body.token) {
        jwt.verify(req.body.token, jsonwebtokensecret, function(err, decoded) {
            if (!err) {
                fetch(ERPNEXT_API_BASE_URL+'/api/resource/User/'+req.body.email,{
                    method : 'put',
                    body : JSON.stringify({
                        "new_password" : req.body.new_password,
                    }),
                    headers : {
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : 'token '+erpNextCredentials.api_key+':'+erpNextCredentials.api_secret
                    }
                }).then((response) => {
                    response.json()
                    .then((json => {
                        if (json.data) {
                            res.send({status : 200, message : 'change password succeed', json : json})
                        } else {
                            res.send({status : 500, message : 'change password failed', json : json})
                        }
                    }))
                    .catch((err) => {
                        res.send({status : 501, message : 'change password failed', err: err})
                    })
                }).catch((err) => {
                    res.send({status: 502, message : 'change password failed', err: err})
                })
            } else {
                res.send({status: 503, message : 'token invalid', err: err})
            }
        })    
    } else {
        res.send({status: 504, message : 'fields not complete'})
    }
})

module.exports = router