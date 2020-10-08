var express = require('express');
const passport = require('passport');
var router = express.Router();

const User = require('../models/user');

/* Register a new user */
router.post('/register', async function(req, res, next) 
{
  const user = new User(req.body);
  await user.setHashedPassword();

  user.save((err, saveduser) => {
    if(err)
    console.log("Error while creating a user "+ err);
    res.json(saveduser);
  });
  
});

/* Login a new user */
router.post("/login", passport.authenticate('local',{ session : false}),function(req, res, next)
{
  res.json(req.user.toAuthJson());
});

module.exports = router;
