var express = require ('express');
var router = express.Router ();
var {erpNextCredentials, ERPNEXT_API_BASE_URL} = require ('../credentials');
const fetch = require ('node-fetch');

router.get ('/:query', function (req, res) {
  // console.log (req.params.query);
  fetch (
    ERPNEXT_API_BASE_URL +
      '/api/resource/AXA%20Books?fields=["*"]&limit_page_length=20',
    {
      method: 'GET',
      headers: {
        Authorization: 'token ' +
          erpNextCredentials.api_key +
          ':' +
          erpNextCredentials.api_secret,
      },
    }
  )
    .then (response => {
      response
        .json ()
        .then (json => {
          res.send ({
            status: 200,
            message: 'Berhasil Mendapatkan Data Buku',
            data: json.data.filter (x => {
              return (
                Number(x.price) >= Number(req.params.query.split('-')[0])
                &&
                Number(x.price) <= Number(req.params.query.split('-')[1])
              );
            }),
          });
        })
        .catch (err => {
          res.send ({status: 501, message: err});
        });
    })
    .catch (err => {
      res.send ({
        status: 502,
        message: err,
      });
    });
});

module.exports = router;
