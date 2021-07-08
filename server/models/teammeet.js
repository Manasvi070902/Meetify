const mongoose = require('mongoose')

const teammeetSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    teamid : {
        type : String
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

module.exports = mongoose.model('TeamMeet', teammeetSchema)