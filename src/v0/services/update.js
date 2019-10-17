var express = require ('express');
var router = express.Router ();
var {erpNextCredentials, ERPNEXT_API_BASE_URL} = require ('../credentials');
const fetch = require ('node-fetch');
var FormData = require ('form-data');

router.post ('/', function (req, res) {
  var data = new FormData ();
  isi = `{
      ${req.body.bookid !== undefined ? `\n\t"bookid": "${req.body.bookid}",` : null}
      ${req.body.authorid !== undefined ? `\n\t"authorid": "${req.body.authorid}",` : null}
      ${req.body.publisherid !== undefined ? `\n\t"publisherid": "${req.body.publisherid}",` : null}
      ${req.body.title !== undefined ? `\n\t"title": "${req.body.title}",` : null}
      ${req.body.genre !== undefined ? `\n\t"genre": "${req.body.genre}",` : null}
      ${req.body.publicationyear !== undefined ? `\n\t"publicationyear": "${req.body.publicationyear}",` : null}
      ${req.body.price !== undefined ? `\n\t"price": "${req.body.price}"` : null}
    }`;
  data.append ('data', isi);
  fetch (
    ERPNEXT_API_BASE_URL + '/api/resource/AXA%20Books/' + req.body.bookid,
    {
      method: 'put',
      body: data,
      headers: {
        Accept: 'application/json',
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
          if (json.data) {
            res.send ({status: 200, message: 'update book succeed', json: json});
          } else {
            res.send ({
              status: 500,
              message: 'either it already exists or your fields are not fulfilled enough',
              json: json,
            });
          }
        })
        .catch (err => {
          res.send ({status: 501, message: 'update book Failed', err: err});
        });
    })
    .catch (err => {
      res.send ({status: 502, message: 'update book Failed', err: err});
    });
});

module.exports = router;
