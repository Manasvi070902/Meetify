const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
    index: true,
  },
  email: {
    type: String
  },
  picture: {
    type: String
  },
  name: {
    type: String
  },
  meets: [{
    type: String,
    ref: 'Meet'
}]

});

const User = mongoose.model("User", userSchema);
module.exports = User;