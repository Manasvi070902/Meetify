const TeamMeet = require('../../models/teammeet');
const Team = require('../../models/team');

exports.addTeamMessage = async({ meetID, sender, message,date ,teamid}) => {
    try{
        await TeamMeet.findByIdAndUpdate(meetID, {
            $push: {
                messages: {
                    message,
                    sender,
                    date
                }
            }
        })
        await Team.findByIdAndUpdate(teamid, {
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
exports.addTeamChatMessage = async({ meetID, sender, message,date ,teamid}) => {
    try{
       
        await Team.findByIdAndUpdate(teamid, {
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