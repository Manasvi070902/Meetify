const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
  
name:{
    type: String,
    required: true
  },
description:{
     type: String
  },
code:{
    type: String
  },
members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique:true
}],

meetings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meet',
    unique:true
}],
messages: [{
  message: {
      type: String,
      required: true
  },
  sender: {
      type: String,
      required: true,
  }
}],
},
{
    timestamps: true
})
const Team = mongoose.model("Team", teamSchema);
module.exports = Team;