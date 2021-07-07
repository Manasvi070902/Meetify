const mongoose = require("mongoose");
const teamnoteSchema = mongoose.Schema({
  
  title:{
    type: String
  },
  description:{
     type: String
  },

  username: {
    type: String
},
teamid : {
  type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
},
date: {
    type:Date,
    default:Date.now
  },  
});

const TeamNote = mongoose.model("TeamNote", teamnoteSchema);
module.exports = TeamNote;