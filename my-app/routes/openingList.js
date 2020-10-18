var express = require('express');
var router = express.Router();
const mongoose=require('mongoose')

const open = require('../models/opening');

const auth=async(req,res,next)=>{
    try {
        if(!req.session.userID){
            return res.redirect('/login')        
        }else
        {
            next();
        } 
    } catch (error) {
        console.log({error1:error})
        return res.redirect('/login')
    }
}

router.get('/dashboard',auth,async(req,res)=>{
    try {
        const items=await  open.find({},{})
        const userData = req.session.userData;  
            return res.render('openingList',{
                openList : items,
                userData
            });
     
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
    let userObjectId=mongoose.Types.ObjectId(req.session.userID)
    let userData = req.session.userData;
    const applied=await open.findOne({_id:objectId,  appliedBy: { $in: [userObjectId] }})
    return res.render('openingDetails', {
            openDetails: openingDetails,
            userData,
            applied
        });

    } catch (error) {
        console.log(error)
    }
})



router.get('/apply/:id',async(req,res)=>{
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
        return res.redirect(`/openingList/opening/${req.params.id}`);  
    }  


  const update = await open.findOneAndUpdate(
    { _id: objectId },
    { $addToSet: { appliedBy: userObjectId } },
    { returnNewDocument: true }
  );
  console.log("db==", update);
  return res.redirect(`/openingList/opening/${req.params.id}`);    

    } catch (error) {
        console.log(error)
    }
})


module.exports = router;