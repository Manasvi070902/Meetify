const express = require('express');
const router = express.Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const Meet = require('../models/meet');
const User = require('../models/user');


//get meet details with member name from User Modal
router.get('/', async function(req,res){
    try{
        const authid = req.headers.auth_id;
        console.log(authid)
        const userdetails = await User.findOne({ "user_id" : authid })
        const user = await User.findById(userdetails._id, 'meets').populate({
            path : 'meets',
            populate : [ {
                path : 'members',
                select: ['name']
            },
            {
                path : 'host',
                select: ['name']
            }
           
            ]})
        console.log(user)
        return res.status(200).json({
            meets: user.meets
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
})

module.exports = router