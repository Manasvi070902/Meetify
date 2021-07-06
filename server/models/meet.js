const mongoose = require('mongoose')

const meetSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name : {
        type: String,
    },
    host: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        message: {
            type: String,
            required: true
        },
        sender: {
            type: String,
            required: true,
        },
        date : {
          type:Date,
          default:Date.now
        }
    }],
},
{
    timestamps: true
})

module.exports = mongoose.model('Meet', meetSchema)