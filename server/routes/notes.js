const express = require('express')
const path = require('path')
const Note = require('./../models/note')
const User = require("../models/user");
const router = express.Router()

router.get('/', async function(req, res) {
  const note =await Note.find().sort({update: 'desc'})
     res.status(200).send( { note: note })
})
router.get('/:id', async function(req, res) {
   const note = await Note.findOne({ id: req.params.id })
   res.status(200).send( { note: note })
})



router.post('/new', async function(req, res) {
  console.log(req)
  const user = await User.findOne({ "user_id" : req.body.user })
  const note = new Note({
    title : req.body.title,
   description : req.body.description,
   user : user._id
  }).save()
  await User.findByIdAndUpdate(user._id, {
    $push: {
        'notes': note._id
    }
})

  

})



router.delete('/:id', async (req, res) => {
  await Team.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router