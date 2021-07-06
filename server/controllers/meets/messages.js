const Meet = require('../../models/meet');

exports.addMessage = async({ meetID, sender, message,date }) => {
    try{
        await Meet.findByIdAndUpdate(meetID, {
            $push: {
                messages: {
                    message,
                    sender,
                    date
                }
            }
        })
        console.log('meeee')
    }
    catch(err){
        console.log(err)
    }
}