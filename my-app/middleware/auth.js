const expressJwt = require('express-jwt');


// function () {
//   return expressJwt({ secret: "MY_Secret-Key", algorithms: ['HS256'] });
// }

const session = require('express-session');
const mongoose=require('mongoose')
const User = require('../models/user')

async function isAuthenticated(req, res, next){
  if(req.session.userData)
  {
      console.log("app.js")
      let userObjectId=mongoose.Types.ObjectId(req.session.userID)
      const isValid =await User.findOne({_id:userObjectId,  token: req.session.userData.token});
      if(isValid)
      {
        next()
      }      
  }
  next()  
}

module.exports = {
  isAuthenticated,
};
