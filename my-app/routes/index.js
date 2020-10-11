var express = require('express');
var router = express.Router();

const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
 res.redirect('/user/login')
});

module.exports = router;
