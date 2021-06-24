const express = require('express')
const path = require('path')
const Team = require('./../models/team')
const Str = require('@supercharge/strings')
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