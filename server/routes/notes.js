const express = require('express')
const path = require('path')
const Note = require('./../models/note')
const User = require("../models/user");
const router = express.Router()

router.get('/', async function(req, res) {
  const authid = req.headers.auth_id;
  console.log(authid)
  const user = await User.findOne({ "user_id" : authid })
  const note =await Note.find({"user" : user._id}).sort({update: 'desc'})
     res.status(200).send( { note: note })
})


router.post('/new', async function(req, res) {
  console.log(req)
  const user = await User.findOne({ "user_id" : req.body.user })
  const note = await new Note({
    title : req.body.title,
   description : req.body.description,
   user : user._id
  }).save().then( res.status(200).send("notes added"))
 
})

router.put('/edit', async function(req, res) {
  console.log(req)
  const noteId = req.headers.note_id;
  const user = await User.findOne({ "user_id" : req.body.user })
  const note = await Note.findByIdAndUpdate(noteId,{
    title : req.body.title,
   description : req.body.description,
   user : user._id
  }).then( res.status(200).send("notes edited"))
  
})



router.delete('/delete', async (req, res) => {
  const noteId = req.headers.note_id;
  await Note.findByIdAndDelete(noteId)
  res.status(200)
})

module.exports = router