const Meet = require('../../models/meet');

exports.addMessage = async({ meetID, sender, message }) => {
    try{
        await Meet.findByIdAndUpdate(meetID, {
            $push: {
                messages: {
                    message,
                    sender
                }
            }
        })
    }
    catch(err){
        console.log(err)
    }
}