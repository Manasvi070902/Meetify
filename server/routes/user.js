const router = require("express").Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const { database } = require("firebase-admin");
const User = require("../models/user");



router.post("/",ensureAuthenticated, function(req, res){
     console.log(req.user)
    
    var user = new User({
        user_id : req.user.user_id,
        email : req.user.email,
        name: req.user.name,
        picture: req.user.picture
    })
    user.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
        console.log(err)
    res.status(400).send("unable to save to database");
    });

});

module.exports = router;
