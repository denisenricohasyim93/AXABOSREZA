'use strict';

var express = require('express');
var router = express.Router();

var _require = require('../credentials'),
    erpNextCredentials = _require.erpNextCredentials,
    superAdminToken = _require.superAdminToken,
    ERPNEXT_API_BASE_URL = _require.ERPNEXT_API_BASE_URL;

var fetch = require('node-fetch');

router.get('/', function (req, res) {
    res.send({ status: 200, message: 'Welcome to DB User Management Service - v0 - User List API ' });
});

router.post('/', function (req, res) {
    if (req.body.superAdminToken === superAdminToken) {
        fetch(ERPNEXT_API_BASE_URL + '/api/resource/User', {
            method: 'GET',
            headers: {
                'Authorization': "token " + erpNextCredentials.api_key + ":" + erpNextCredentials.api_secret
            }
        }).then(function (response) {
            response.json().then(function (json) {
                res.send({ status: 200, message: 'Berhasil Mendapatkan Data User List', data: json });
            }).catch(function (err) {
                res.send({ status: 501, message: err });
            });
        }).catch(function (err) {
            res.send({
                status: 502,
                message: err
            });
        });
    } else {
        res.send({ status: 500, message: 'Wrong Super Admin Token, You are not authorized to access this API' });
    }
});

module.exports = router;