var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken');
const fetch = require('node-fetch')
var { ERPNEXT_API_BASE_URL, jsonwebtokensecret, erpNextCredentials } = require('../credentials')

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
                        res.send({ status: 200, message: 'Login Berhasil', token: token, json: json })
                    } else {
                        res.send({ status: 500, message: 'Login Gagal' })
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

router.post('/forOwner', function (req, res) {
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
                        // var token = jwt.sign({}, jsonwebtokensecret);
                        // res.send({ status: 200, message: 'Login Berhasil', token: token, json : json})
                        fetch(ERPNEXT_API_BASE_URL + '/api/resource/Supplier?fields=["name","email_supplier"]', {
                            method: 'get',
                            headers: {
                                'Authorization': 'token ' + erpNextCredentials.api_key + ':' + erpNextCredentials.api_secret
                            }
                        }).then(async (response) => {
                            await response.json()
                                .then((async json => {
                                    if (json.data) {
                                        // res.send({ status: 200, message: 'get crop list succeed', json: json })
                                        let ketemu = null;
                                        await json.data.map(async (item, index) => {
                                            if (item.email_supplier === req.body.email) {
                                                ketemu = await item
                                            }
                                        })
                                        if (ketemu) {
                                            var token = jwt.sign({}, jsonwebtokensecret);
                                            res.send({ status: 200, message: 'Selamat, Login Berhasil', token: token })
                                        } else {
                                            res.send({ status: 501, message: 'Maaf, Login Gagal, Nama Owner tidak ada di database', data : json.data })
                                        }
                                    } else {
                                        res.send({ status: 502, message: 'get owner list failed', json: json })
                                    }
                                }
                                ))
                                .catch((err) => {
                                    res.send({ status: 503, message: 'get owner list failed', err: err })
                                })
                        }).catch((err) => {
                            res.send({ status: 504, message: 'get owner list failed', err: err })
                        })
                    } else {
                        res.send({ status: 505, message: 'Login Gagal' })
                    }
                })
                .catch((err) => {
                    res.send({
                        status: 506,
                        message: 'Login Gagal'
                        // err : err 
                    })
                })
        })
        .catch((err) => {
            res.send({
                status: 507,
                message: 'Login Gagal'
                // err: err
            })
        })
})

module.exports = router