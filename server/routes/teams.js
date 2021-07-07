const express = require('express')
const path = require('path')
const Team = require('./../models/team')
const User = require('./../models/user')
const Str = require('@supercharge/strings')
const { createTeam } = require('../controllers/teams/team')
const router = express.Router()

router.get('/', async function(req, res) {
  const authid = req.headers.auth_id;
  console.log(authid)
  const user = await User.findOne({ "user_id" : authid })
  const team =await Team.find({"members" : user._id}).sort({createdAt:-1})
     res.status(200).send( { team: team })
})
router.get('/details', async function(req, res) {
  const teamid = req.headers.team_id;
  
   const team = await Team.findById(teamid)
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
return res.status(200).json({
  code: team.code,
  teamid : team._id
})
}catch (err) {
  console.log(err);
}
})

router.post('/join', async function(req, res) {
  console.log(req.body)
  try{
    const team = await Team.findOne({"code" : req.body.code})
  const user = await User.findOneAndUpdate({ "user_id" : req.body.user },{
    $addToSet: {
      'teams': team._id
  }
  }) 
  await Team.findByIdAndUpdate(team._id, {
    $addToSet: {
        'members': user._id
    }
})
return res.status(200).json({
  code:team.code
})
 
}catch (err) {
  console.log(err);
  return res.status(500).json({
    message: 'User already exists!'
})

}
})


router.delete('/:id', async (req, res) => {
  await Team.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router