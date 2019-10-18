var express = require ('express');
var router = express.Router ();
var {erpNextCredentials, ERPNEXT_API_BASE_URL} = require ('../credentials');
const fetch = require ('node-fetch');
var FormData = require ('form-data');

router.post ('/', function (req, res) {
  //   console.log(req.body)
  var data = new FormData ();
  var isi = `{\n\t"bookid": "${req.body.bookid}",\n\t"authorid": "${req.body.authorid}",\n\t"publisherid": "${req.body.publisherid}",\n\t"title": "${req.body.title}",\n\t"genre": "${req.body.genre}",\n\t"publicationyear": "${req.body.publicationyear}",\n\t"price": "${req.body.price}",\n\t"name": "${req.body.bookid}"\n}`
  // console.log(isi)
  data.append (
    'data',
    isi
  );
  fetch (ERPNEXT_API_BASE_URL + '/api/resource/AXA%20Books', {
    method: 'post',
    body: data,
    headers: {
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
          if (json.data) {
            res.send ({status: 200, message: 'add book succeed', json: json});
          } else {
            res.send ({
              status: 500,
              message: 'either it already exists or your fields are not fulfilled enough',
              json: json,
            });
          }
        })
        .catch (err => {
          res.send ({status: 501, message: 'add book Failed', err: err});
        });
    })
    .catch (err => {
      res.send ({status: 502, message: 'add book Failed', err: err});
    });
});

module.exports = router;
