const TeamMeet = require('../../models/teammeet');
const Team = require('../../models/team');

exports.addTeamMeetMessage = async({ meetID, sender, message,date ,teamid}) => {
    try{
        console.log(teamid)
        
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
   
        console.log('both chats')
    }
    catch(err){
        console.log(err)
    }
}
exports.addTeamChatMessage = async({ meetID, sender, message,date ,teamid}) => {
    try{
       console.log(teamid)
        await Team.findByIdAndUpdate(teamid, {
            $push: {
                messages: {
                    message,
                    sender,
                    date
                }
            }
        })
        console.log('heeee')
    }
    catch(err){
        console.log(err)
    }
}