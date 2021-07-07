const mongoose = require("mongoose");
const teamnoteSchema = mongoose.Schema({
  
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

const TeamNote = mongoose.model("TeamNote", teamnoteSchema);
module.exports = TeamNote;