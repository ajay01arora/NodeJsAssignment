var express = require('express');
var router = express.Router();
const passport = require('passport');
const session = require('express-session')
const bcrypt=require('bcrypt')
const User=require('../models/user')

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
    req.session.name = req.user.username;
    res.json(req.user.toAuthJson());
});

/* Login a new user */
router.get("/login",async(req, res, next)=>{
  

    res.render('login');
});


router.post("/login",async(req, res, next)=>{
    try {
        const {body,session}=req
        console.log({body,session})
const user=await User.findOne({username:body.username})
// console.log({user})
if(!user){
    return res.status(400).send({message:"No user with this username Exist"})
}
const isMatch = await bcrypt.compareSync(body.password, user.password)
// console.log({isMatch})
// if (!isMatch) {
//     return res.status(400).send({ message: 'Password did not match' })
// }

const token=await user.generateJwtToken()
// console.log({token})
req.session.userID = user._id
req.session.userData=user

if(user.user_role=="Manager"){
    // return res.render("openingList",{token})
    return res.redirect('/manager/dashboard');
}else{
    return res.redirect('/employee/dashboard');
    // return res.render("openingList",{openList:[],token})

    // return res.redirect('/employee/dashboard');
}
// return res.status(200).send({
//     user,
//     token,
//     success: true
} catch (error) {
// })
        console.log(error)
    }
   

    // res.render('login');
});


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

/* Register a new user */
router.get("/register",function(req, res, next)
{
    res.render('register');
});

module.exports = router;