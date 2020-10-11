var express = require('express');
var router = express.Router();
const passport = require('passport');
const session = require('express-session')
const bcrypt=require('bcrypt')
const User=require('../models/user')


const auth=async(req,res)=>{
    if(!req.session.userData && ! req.session.userData._id){
        return res.render('login')
    }
}
router.get('/dashboard',auth,async(req,res)=>{
    // const 
})


module.exports = router;