const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    validate: /^.{28}$/,
    immutable: true,
    index: true,
  },
  email: {
    type: String,
    trim: true,
    validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    required: true,
    unique: true,
    immutable: true,
  },
  profilePhoto: {
    type: String,
    validate: /^data:image\/[^;]+;base64[^"]+$/,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    immutable: true,
    index: true,
    trim: true,
  },
  meetings: [{
    type: String,
    ref: 'Meet'
}]
});

const User = mongoose.model("User", userSchema);
module.exports = User;