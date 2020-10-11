var express = require('express');
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
            console.log("Error while creating opening "+ err);
            
            res.redirect('/open');
        })
    }else
    {
        open = new Open(req.body);
        open._id = Math.random().toString(36).substring(2, 6);
        open.save((err, savedOpening) => {
            if(err)
            console.log("Error while creating opening "+ err);
            res.redirect('/open');
        })        
    }    
    
});


router.get("/create",function(req, res, next)
{
    res.render('createOrUpdateOpening', {
        openingForUpdate : {'createdBy' : req.session.user.full_name},
        message : "Create an opening",
    });    
});

router.get("/update/:id",function(req, res, next)
{
    Open.findOne({_id : req.params.id}, function(err, item){
        if(err)
        console.log("Error");
        
        res.render('createOrUpdateOpening',{
            openingForUpdate : item,
            message : "Update an opening",
        });
    })
    
    
});


module.exports = router;