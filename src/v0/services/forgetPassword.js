var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken');
const fetch = require('node-fetch')
var { ERPNEXT_API_BASE_URL, jsonwebtokensecret, emailAccount, erpNextCredentials } = require('../credentials')

router.get('/', function (req, res) {
    res.send({ status: 200, message: 'Welcome to DB User Management Service - v0 - Forget Password API ' })
})

router.post('/getTokenFirst', function (req, res) {
    var ketemu = false
    var itemKetemu = null
    fetch(ERPNEXT_API_BASE_URL + '/api/resource/User', {
        method: 'GET',
        headers: {
            'Authorization': "token " + erpNextCredentials.api_key + ":" + erpNextCredentials.api_secret
        },
    })
        .then(response => {
            response.json()
                .then(xyz => {
                    if (xyz.data) {
                        xyz.data.map((item, index) => {
                            if (req.body.email === item.name) {
                                itemKetemu = item
                                ketemu = true
                            }
                        })
                        if (ketemu) {
                            // E-MAIL KE YANG PUNYA AKUN DAN BERITAHU TOKEN
                            var nodemailer = require('nodemailer');
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: emailAccount.user,
                                    pass: emailAccount.pass
                                }
                            });
                            var token = jwt.sign({}, jsonwebtokensecret);
                            const mailOptions = {
                                from: emailAccount.user, // sender address
                                to: req.body.email, // list of receivers
                                subject: 'SMARTFARM - Pemberitahuan Password', // Subject line
                                html: '<p>Copy Token Ini Ke App : ' + token + '</p>'// plain text body
                            };
                            transporter.sendMail(mailOptions, function (err, info) {
                                if (err) {
                                    res.send({
                                        status: 503,
                                        message: 'Gagal Mengirim Token via E-Mail',
                                        err: err
                                    })
                                } else {
                                    res.send({
                                        status: 200,
                                        message: 'Sukses Mengirim Token Ke ' + req.body.email
                                    })
                                }
                            });
                        } else {
                            // BERITAHU REQUESTER BAHWA AKUN TIDAK ADA
                            res.send({
                                status: 504,
                                message: 'E-Mail Tidak Terdaftar di Sistem'
                            })
                        }
                    } else {
                        res.send({ status: 500, message: 'list kosong ...' })
                    }
                    // res.send({status : 200, hasil : xyz.data})
                })
                .catch((err) => {
                    res.send({ status: 501, message: err })
                })
        })
        .catch((err) => {
            res.send({
                status: 502,
                message: err
            })
        })
})

module.exports = router