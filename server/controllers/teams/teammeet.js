const TeamMeet = require('../../models/teammeet');
const Team = require('../../models/team');

exports.createTeamMeet = async({ roomID, hostID , meetname , teamid}) => {
    
    try{
        console.log(teamid)
        const meet = await new TeamMeet({
            _id: roomID,
            name : meetname,
            host: [hostID],
            members: [hostID],
            teamid : teamid
        }).save();
     
    }
    catch(err){
        console.log(err)
    }
}
exports.addTeamMeetMember = async({ roomID, userID }) => {
    try{
        
        await Promise.all([
    
            TeamMeet.findByIdAndUpdate(roomID, {
                $addToSet: {
                    'members': userID
                }
            })
        ])
    }
    catch(err){
        console.log(err)
    }
}
