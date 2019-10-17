var express = require ('express');
var router = express.Router ();
var {erpNextCredentials, ERPNEXT_API_BASE_URL} = require ('../credentials');
const fetch = require ('node-fetch');

router.delete ('/', function (req, res) {
  fetch (ERPNEXT_API_BASE_URL + '/api/resource/AXA%20Books/' + req.body.bookID, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'token ' +
        erpNextCredentials.api_key +
        ':' +
        erpNextCredentials.api_secret,
    },
  })
    .then (response => {
      response
        .json ()
        .then (json => {
          if (json.message === 'ok') {
            res.send ({status: 200, message: 'berhasil delete', json : json});
          } else {
            res.send ({status: 500, message: 'gagal delete', json : json});
          }
        })
        .catch (err => {
          res.send ({status: 501, message: 'delete book failed', err: err});
        });
    })
    .catch (err => {
      res.send ({status: 502, message: 'delete book failed', err: err});
    });
});

module.exports = router;
