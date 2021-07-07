const express = require('express')
const path = require('path')
const Note = require('./../models/note')
const User = require("../models/user");
const TeamNote = require('./../models/teamnote')
const router = express.Router()
const Meet = require('../models/meet');

router.get('/', async function(req, res) {
  const authid = req.headers.auth_id;
  console.log(authid)
  const user = await User.findOne({ "user_id" : authid })
  const note =await Note.find({"user" : user._id}).sort({date:-1})
     res.status(200).send( { note: note })
})


router.post('/new/public', async function(req, res) {

  try {
  const roomid = req.body.room_id;
   console.log(roomid)
  const meet = await Meet.findById(roomid)
  console.log( meet.members)
  meet.members.forEach(id => {
    const note = new Note({
      title : req.body.title,
     description : req.body.description,
     user : id
    })
   
    note.save(function(err){
      if(!err)
      {
      res.status(200)
      }   else{
          console.log(err)
          };
      
   });  
  })}
  catch (err) {
    next(err);
  }
 
})

router.post('/new', async function(req, res) {

  try{
  const user = await User.findOne({ "user_id" : req.body.user }) 
  const note = await new Note({
    title : req.body.title,
   description : req.body.description,
   user : user._id
  })
  note.save(function(err){
    if(!err)
    {
    res.status(200)
    }   else{
        console.log(err)
        };
    
 });  
}catch (err) {
  next(err);
}
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

//team notes
router.post('/new/team', async function(req, res) {

  try {
   
    const note = new TeamNote({
      title : req.body.title,
     description : req.body.description,
     username: req.body.user,
     teamid : req.body.teamid
    })
   
    note.save(function(err){
      if(!err)
      {
      res.status(200)
      }   else{
          console.log(err)
          };
      
  
  })}
  catch (err) {
    next(err);
  }
 
})

router.get('/team', async function(req, res) {
  
  const teamid = req.headers.teamid;
  console.log(teamid)

  const note =await TeamNote.find({"teamid" : teamid}).sort({date:-1})
     res.status(200).send( { note: note })
})
router.put('/team/edit', async function(req, res) {
  console.log(req)
  
  const note = await TeamNote.findByIdAndUpdate(noteId,{
    title : req.body.title,
   description : req.body.description,
   username : req.body.user
  }).then( res.status(200).send("notes edited"))
  
})

router.delete('/team/delete', async (req, res) => {
  const noteId = req.headers.note_id;
  await TeamNote.findByIdAndDelete(noteId)
  res.status(200)
})


module.exports = router