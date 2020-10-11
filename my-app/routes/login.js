var express = require('express');
var router = express.Router();

const passport = require('passport');

/* Login a new user */
router.post("/", passport.authenticate('local',{ session : false}),function(req, res, next)
{
    req.session.user = req.user;
    res.json(req.user.toAuthJson());
});

/* Login a new user */
router.get("/",function(req, res, next)
{
    res.render('login');
});

module.exports = router;