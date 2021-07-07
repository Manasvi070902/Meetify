const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
  
  title:{
    type: String
  },
  description:{
     type: String
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},

date: {
    type:Date,
    default:Date.now
  },  
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;