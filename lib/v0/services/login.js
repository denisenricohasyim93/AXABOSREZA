'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fetch = require('node-fetch');

var _require = require('../credentials'),
    ERPNEXT_API_BASE_URL = _require.ERPNEXT_API_BASE_URL,
    jsonwebtokensecret = _require.jsonwebtokensecret;

router.get('/', function (req, res) {
    res.send({ status: 200, message: 'Welcome to DB User Management Service - v0 - Login API ' });
});

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
    }).then(function (response) {
        response.json().then(function (json) {
            if (json.message === "Logged In") {
                var token = jwt.sign({}, jsonwebtokensecret);
                res.send({ status: 200, message: 'Login Berhasil', token: token });
            } else {
                res.send({ status: 500, message: 'Login Gagal' });
            }
        }).catch(function (err) {
            res.send({
                status: 501,
                message: 'Login Gagal'
                // err : err 
            });
        });
    }).catch(function (err) {
        res.send({
            status: 502,
            message: 'Login Gagal'
            // err: err
        });
    });
});

module.exports = router;