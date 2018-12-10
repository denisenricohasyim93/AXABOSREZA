var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var {ERPNEXT_API_BASE_URL, erpNextCredentials, jsonwebtokensecret} = require('../credentials')
const fetch = require('node-fetch')

router.get('/', function (req, res) {
    res.send({ status: 200, message: 'Welcome to DB User Management Service - v0 - Register API ' })
})

router.post('/', function (req, res) {
    fetch(ERPNEXT_API_BASE_URL+'/api/resource/User',{
        method : 'post',
        body : JSON.stringify({
            "email" : req.body.email,
            "first_name" : req.body.full_name,
            "user_type" : "System User",
            "new_password" : req.body.new_password,
            "user_image" : req.body.user_image,
            "role_html" : "Agriculture Manager",
            "Gender" : req.body.gender,
            "mobile_no" : req.body.mobile_no,
            "location" : req.body.address,
            "roles" : [
                    {
                        "role": "Agriculture Manager",
                        "doctype": "Has Role",
                        "creation": "2018-11-24 18:14:18.356269",
                        "docstatus": 0,
                        "parentfield": "roles",
                        "parenttype": "User",
                        "name": "45319a73e6",
                        "idx": 4,
                        "owner": "Administrator",
                        "modified_by": "denisenricohasyim93@gmail.com",
                        "modified": "2018-11-24 18:17:50.792479",
                        "parent": "denisenricohasyim93@gmail.com"
                    },
                    {
                        "role": "Agriculture User",
                        "doctype": "Has Role",
                        "creation": "2018-11-24 18:14:18.356269",
                        "docstatus": 0,
                        "parentfield": "roles",
                        "parenttype": "User",
                        "name": "2d8d5f0658",
                        "idx": 5,
                        "owner": "Administrator",
                        "modified_by": "denisenricohasyim93@gmail.com",
                        "modified": "2018-11-24 18:17:50.792479",
                        "parent": "denisenricohasyim93@gmail.com"
                    }
                ]
        }),
        headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'token '+erpNextCredentials.api_key+':'+erpNextCredentials.api_secret
        }
    }).then((response) => {
        response.json()
        .then((json => {
            if (json._server_messages === "[\"{\\\"message\\\": \\\"Please setup default Email Account from Setup > Email > Email Account\\\", \\\"indicator\\\": \\\"red\\\"}\"]") {
                var token = jwt.sign({}, jsonwebtokensecret);
                res.send({status : 200, message : 'register succeed', token : token, data : json.data})
            } else {
                res.send({status : 500, message : 'register failed, your password not strong enough (min. 10 characters, combined with special characters and numbers) or user with mobile_phone or full_name that you input already exists', json : json})
            }
        }))
        .catch((err) => {
            res.send({status : 501, message : 'register failed', err: err})
        })
    }).catch((err) => {
        res.send({status: 502, message : 'register failed', err: err})
    })
})

module.exports = router