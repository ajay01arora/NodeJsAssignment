var express = require('express');
var router = express.Router();
const passport = require('passport');
const session = require('express-session')
const bcrypt=require('bcrypt')
const User=require('../models/user')
const mongoose=require('mongoose')

const open = require('../models/opening');

const auth=async(req,res,next)=>{
    try {
        if(!req.session.userID){
            return res.redirect('/user/login')
        
    } else if(req.session.userData.user_role=="Employee") {
        next()
    }
    } catch (error) {
        console.log({error1:error})
        return res.redirect('/user/login')
    }
}

// const redirectDashboard=async(req,res,next)=>{
//     try {
//         if(req.session.userID){
//             return res.redirect('/employee/dashboard');
//         }
//         else next()
//     } catch (error) {
//         console.log({error1:error})
//         // return res.redirect('/user/login')
//     }
// }


/* Opening a list */
// router.get("/", function(req, res, next)
// {
   
    
// });
router.get('/dashboard',auth,async(req,res)=>{
    try {
        
        // console.log({session:req.session})
       const items=await  open.find({},{})// function (err, items){
           console.log({items})
            return res.render('openingList',{
                openList : items,
                isManager:false
            });
    //     })
    } catch (error) {
        console.log({error})
    }
})


router.get('/opening/:id',auth,async(req,res)=>{
    try {
        console.log("++++++++++++++++++inside the opening/:id Url _++++++++++++++++=======")
        let objectId =mongoose.Types.ObjectId(req.params.id)
        const openingDetails=await open.findOne({_id:objectId})
        if(!openingDetails){
            return res.status(400).send({message:"No such opening detail found"})
        }
    // let applied=false
    // if(openingDetails.appliedBy && openingDetails.appliedBy.length){
        //     for(opening of openingDetails.appliedBy){
    //         if(opening==objectId){
        //             applied=true
    //             break;
    //         }
    //     }
    // }
    
    let userObjectId=mongoose.Types.ObjectId(req.session.userID)
    const applied=await open.findOne({_id:objectId,  appliedBy: { $in: [userObjectId] }})


        return res.render('openingDetails', {
            openDetails: openingDetails,
            isManager:false,
            applied
        });

    } catch (error) {
        console.log(error)
    }
})



router.get('/opening/apply/:id',async(req,res)=>{
    try {
        let objectId =mongoose.Types.ObjectId(req.params.id)
        
        const opening=await open.findOne({_id:objectId})
        if(!opening){
            return res.status(400).send({message:"No Opening found"})
        }

        if(opening=="Close"){
            return res.status(400).send({message:"Opening is now closed"})
        }


        let userObjectId=mongoose.Types.ObjectId(req.session.userID)
    const applied=await open.findOne({_id:objectId,  appliedBy: { $in: [userObjectId] }})
    if(applied){
        return res.redirect(`/employee/opening/${req.params.id}`);
    }
    // opening.appliedBy

    


  const update = await open.findOneAndUpdate(
    { _id: objectId },
    { $addToSet: { appliedBy: userObjectId } },
    { returnNewDocument: true }
  );
  console.log("db==", update);
  return res.redirect(`/employee/opening/${req.params.id}`);

    

    } catch (error) {
        console.log(error)
    }
})


module.exports = router;