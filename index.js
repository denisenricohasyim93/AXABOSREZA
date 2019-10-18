var express = require ('express');
var app = express ();
var bodyParser = require ('body-parser');
var gatewayv0 = require ('./src/v0/gateway');

app.use (bodyParser.json ());
app.use (function (req, res, next) {
  res.header ('Access-Control-Allow-Origin', '*');
  res.header (
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next ();
});

app.get ('/', function (req, res) {
  res.send ({
    status: 200,
    message: 'Welcome To DB User Management Service APIs',
  });
});

app.use ('/v0', gatewayv0);

app.listen (7777, () => {
  console.log ('AXA BOS REZA Listen to PORT 7777');
});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
