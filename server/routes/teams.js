const express = require('express')
const path = require('path')
const Team = require('./../models/team')
const User = require('./../models/user')
const Str = require('@supercharge/strings')
const { createTeam } = require('../controllers/teams/team')
const router = express.Router()

router.get('/', async function(req, res) {
  const team =await Team.find().sort({update: 'desc'})
     res.status(200).send( { team: team })
})
router.get('/:id', async function(req, res) {
   const team = await Team.findOne({ id: req.params.id })
   res.status(200).send( { team: team })
})


router.post('/new', async function(req, res) {
  console.log(req.body)
  try{
  const user = await User.findOne({ "user_id" : req.body.user }) 
  console.log(user)
  const team = await new Team({
    name : req.body.name,
  description : req.body.description,
  code : Str.random(5),
    members: [user._id]
}).save();
await User.findByIdAndUpdate(user._id, {
    $push: {
        'teams': team._id
    }
})
 
}catch (err) {
  console.log(err);
}
})

router.post('/new', async function(req, res) {

  console.log(req)


   let team = new Team({
     name : req.body.name,
    description : req.body.description,
     code : Str.random(5)  
   })
  
  
 console.log(team)
  
 team.save()
    .then(item => {
    res.status(200).send("team added to database");
    })
    .catch(err => {
        console.log(err)
    res.status(400).send("unable to save to database");
    });
})



router.delete('/:id', async (req, res) => {
  await Team.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router