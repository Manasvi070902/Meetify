const express = require('express')
const path = require('path')
const Note = require('./../models/note')

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
   let note = new Note({
     title : req.body.title,
    description : req.body.description
   })
  
  

  
 note.save()
    .then(item => {
    res.status(200).send("note added to database");
    })
    .catch(err => {
        console.log(err)
    res.status(400).send("unable to save note to database");
    });
})



router.delete('/:id', async (req, res) => {
  await Team.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router