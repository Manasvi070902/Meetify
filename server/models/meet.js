const mongoose = require('mongoose')

const meetSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
},
{
    timestamps: true
})

module.exports = mongoose.model('Meet', meetSchema)