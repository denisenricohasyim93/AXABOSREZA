'use strict';

var express = require('express');
var router = express.Router();

var _require = require('frappe-node'),
    FrappeNode = _require.FrappeNode;

var frappe_node = new FrappeNode();
frappe_node.authenticate('http://182.23.20.109:8000', 'denisenricohasyim93@gmail.com', 'tr1tr0n1kdb');

router.get('/', function (req, res) {
    res.send({ status: 200, message: 'Welcome to DB User Management Service - v0 - Register API ' });
});

router.post('/', function (req, res) {
    frappe_node.update_doc('/Note', { name: 'usertest2@gmail.com', user_type: 'System User' }).then(function (Response) {
        res.send({ status: 200, message: Response });
    }).catch(function (rej) {
        res.send({ status: 500, message: rej });
    });
});

module.exports = router;