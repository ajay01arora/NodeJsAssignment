var express = require('express');
var router = express.Router();
const passport = require('passport');
const session = require('express-session')
const bcrypt=require('bcrypt')

const User=require('../models/user')
const {loginValidation,registerValidation}=require('../validations/commonValidation')

// router.use(session({
//     name: 'userdata',
//     resave: false,
//     saveUninitialized: false,
//     secret: 'samplesample',
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24, // one day 24 hours
//         sameSite: true,
//         secure: false,
//     }
// }))



const redirectLogin = (req, res, next) => {
    if (!req.session.userID) {
        res.redirect('/login')
    } else {
        next()
    }
}

const redirectEmployee = (req, res, next) => {
    if (req.session.userID) {
        res.redirect('/open')
    } else {
        next()
    }
}

const redirectManager = (req, res, next) => {
    if (req.session.userID) {
        res.redirect('/createOrUpdate')
    } else {
        next()
    }
}




/* Login a new user */
router.post("/", passport.authenticate('local',{ session : false}),function(req, res, next)
{
    req.user.toAuthJson();
    req.session.userID = req.user._id
    req.session.userData=req.user;
    return res.redirect('/openingList/dashboard');
});

/* Login a new user */
router.get("/",async(req, res, next)=>{
      res.render('login');
});


// router.post("/login",loginValidation,async(req, res, next)=>{
//     try {
//         const er = await User.find({},{});
//         const {body,session}=req
//         console.log({body,session})
// const user=await User.findOne({username:body.username})
// if(!user){
//     return res.status(400).send({message:"No user with this username Exist"})
// }
// const isMatch = await bcrypt.compareSync(body.password, user.password)
// const token=await user.generateJwtToken()
// if(isMatch)
// {
// req.session.userID = user._id
// req.session.userData=user
// return res.redirect('/openingList/dashboard');
// }
// } catch (error)
//  {
//         console.log(error)
//     }
   

   
// });

router.get("/logout",function(req, res, next)
{
    try {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('home')
            }
            res.clearCookie('adminData')
            return res.redirect('/login');
        })
    } catch (e) {
        res.status(500).send(e)
    }
   
});


module.exports = router;