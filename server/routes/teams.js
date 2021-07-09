const express = require('express')
const path = require('path')
const Team = require('./../models/team')
const User = require('./../models/user')
const TeamMeet = require('./../models/teammeet');
const TeamNote = require('./../models/teamnote');
const Str = require('@supercharge/strings')
const { createTeam } = require('../controllers/teams/team')
const router = express.Router()

//get team name
router.get('/', async function (req, res) {
  const authid = req.headers.auth_id;
  console.log(authid)
  const user = await User.findOne({ "user_id": authid })
  const team = await Team.find({ "members": user._id }).sort({ createdAt: -1 })
  res.status(200).send({ team: team })
})

//get team details
router.get('/details', async function (req, res) {
  try {
    const teamid = req.headers.team_id;

    const team = await Team.findById(teamid)
    res.status(200).send({ team: team })
  } catch (err) {
    res.status(400).send({ err: err })
  }
})

//meeting conducted by specific team
router.get('/meetings', async function (req, res) {

  try {
    const teamid = req.headers.team_id;
    console.log(teamid)
    const meets = await TeamMeet.find({ "teamid": teamid }).populate([
      {
        path: 'members',
        select: ['name', 'email']
      },
      {
        path: 'host',
        select: ['name']
      }]
    )
    res.status(200).send({ meets: meets })
  } catch (err) {
    console.log(err);
  }
})

//add new team
router.post('/new', async function (req, res) {
  console.log(req.body)
  try {
    const user = await User.findOne({ "user_id": req.body.user })
    console.log(user)
    const team = await new Team({
      name: req.body.name,
      description: req.body.description,
      code: Str.random(5),
      members: [user._id]
    }).save();
    await User.findByIdAndUpdate(user._id, {
      $push: {
        'teams': team._id
      }
    })
    return res.status(200).json({
      code: team.code,
      teamid: team._id
    })
  } catch (err) {
    console.log(err);
  }
})

//join team
router.post('/join', async function (req, res) {
  console.log(req.body)
  try {
    const team = await Team.findOne({ "code": req.body.code })
    const user = await User.findOneAndUpdate({ "user_id": req.body.user }, {
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
      code: team.code
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'User already exists!'
    })

  }
})

//delete team
router.delete('/delete', async (req, res) => {
  const teamid = req.headers.team_id;
  console.log(teamid)
  try {
    await Team.findByIdAndDelete(teamid)
    res.status(200)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router