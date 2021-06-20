const express = require('express');
const router = express.Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const Meet = require('../models/meet');
const User = require('../models/user');


router.get('/', ensureAuthenticated), async function(req,res){
    try{
        const { id } = req.userData
        const user = await User.findById(id, 'meets').populate({
            path : 'meets',
            select: ['members', 'createdAt'],
            populate : {
                path : 'members',
                select: ['name']
            }
        })
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
}

module.exports = router