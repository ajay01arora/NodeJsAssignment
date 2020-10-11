var express = require('express');
var router = express.Router();

const open = require('../models/opening');

/* Opening a list */
router.get("/", function(req, res, next)
{
    open.find({}, function (err, items){
        res.render('openingList',{
            openList : items,
        });
    })
    
});

/* Opening a list */
router.get("/:id",function(req, res, next)
{
    open.findOne({_id : req.params.id}, function(err, item){
        res.render('openingDetails', {
            openDetails : item,
        });
    })
    
});


module.exports = router;