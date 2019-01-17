var express = require('express')
var router = express.Router()
var { erpNextCredentials, superAdminToken, ERPNEXT_API_BASE_URL } = require('../credentials')
const fetch = require('node-fetch')

router.get('/', function (req, res) {
    res.send({ status: 200, message: 'Welcome to DB User Management Service - v0 - User List API ' })
})

router.post('/', function (req, res) {
    if (req.body.superAdminToken === superAdminToken) {
        fetch(ERPNEXT_API_BASE_URL+'/api/resource/User/'+req.body.email, {
            method: 'GET',
            headers: {
                'Authorization': "token "+erpNextCredentials.api_key+":"+erpNextCredentials.api_secret
            },
        })
            .then(response => {
                response.json()
                .then(json => {
                    res.send({status :200, message : 'Berhasil Mendapatkan Data User List', data : json})
                })
                .catch((err) => {
                    res.send({status : 501, message : err})
                })
            })
            .catch((err) => {
                res.send({
                    status : 502,
                    message : err
                })
            })
    } else {
        res.send({ status: 500, message: 'Wrong Super Admin Token, You are not authorized to access this API' })
    }
})

router.post('/all', function (req, res) {
    if (req.body.superAdminToken === superAdminToken) {
        fetch(ERPNEXT_API_BASE_URL+'/api/resource/User', {
            method: 'GET',
            headers: {
                'Authorization': "token "+erpNextCredentials.api_key+":"+erpNextCredentials.api_secret
            },
        })
            .then(response => {
                response.json()
                .then(json => {
                    res.send({status :200, message : 'Berhasil Mendapatkan Data User List', data : json})
                })
                .catch((err) => {
                    res.send({status : 501, message : err})
                })
            })
            .catch((err) => {
                res.send({
                    status : 502,
                    message : err
                })
            })
    } else {
        res.send({ status: 500, message: 'Wrong Super Admin Token, You are not authorized to access this API' })
    }
})

module.exports = router
