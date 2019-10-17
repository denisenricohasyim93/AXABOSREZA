var express = require('express')
var router = express.Router()
var authorname = require('./services/authorname');
var hapus = require('./services/delete');
var genre = require('./services/genre');
var input = require('./services/input');
var title = require('./services/title');
var price = require('./services/price');
var update = require('./services/update');

router.use('/authorname', authorname)
router.use('/delete', hapus)
router.use('/genre', genre)
router.use('/input', input)
router.use('/price', price)
router.use('/title', title)
router.use('/update', update)

module.exports = router