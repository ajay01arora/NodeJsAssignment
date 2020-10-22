var express = require('express');
const { update } = require('../models/opening');
var router = express.Router();

const Open = require('../models/opening');

/* Opening a list */
router.get("/",function(req, res, next)
{
    res.render('createOrUpdateOpening', {
        openingForUpdate : {'createdBy' : req.session.user.full_name},
        message : "Create an opening",
    });  
});

router.post("/", function(req, res, next)
{
    if(req.body._id)
    {
        Open.updateOne({'_id' : req.body._id },req.body,(err, savedOpening) => {
            if(err)
            // console.log("Error while creating opening "+ err);   

            return res.redirect('/openingList/dashboard');         
        })
    }else
    {
        var newOpening = req.body;
        newOpening.createdBy = req.session.userData._id;
        open = new Open(newOpening);
         open.save((err, savedOpening) => {
            if(err)
            console.log("Error while creating opening "+ err);
            // console.log(savedOpening);
            return res.redirect('/openingList/dashboard');

        })        
    }    
    
});


router.get("/create",function(req, res, next)
{
    res.render('createOrUpdateOpening', {
        openingForUpdate : {'createdBy' : 'Ajay'},
        message : "Create an opening",
        isUpdate : false
    });    
});

router.get("/update/:id",function(req, res, next)
{
    Open.findOne({_id : req.params.id}, function(err, item){
        if(err)
        console.log("Error");
        
        res.render('createOrUpdateOpening',{
            openingForUpdate : item,
            isUpdate:  true,
            message : "Update an opening",
        });
    })
    
    
});


module.exports = router;