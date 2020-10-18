var express = require('express');
var router = express.Router();

const User = require('../models/user');

/* Register a new user */
router.post('/', async function(req, res, next) 
{
  const user = new User(req.body);
  await user.setHashedPassword();
  user.save((err, saveduser) => {
    if(err)
    console.log("Error while creating a user "+ err);
    req.session.userID = saveduser._id
    req.session.userData=saveduser
    return res.redirect('/openingList/dashboard');

  });
  
});

/* Register a new user */
router.get("/",function(req, res, next)
{
    res.render('register');
});



module.exports = router;