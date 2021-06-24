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
    ref: 'User'
}],
  meetings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meet'
}],

});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;