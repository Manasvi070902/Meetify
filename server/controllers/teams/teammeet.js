const TeamMeet = require('../../models/teammeet');
const Team = require('../../models/team');

exports.createTeamMeet = async({ roomID, hostID , meetname , teamid}) => {
    
    try{
        
        const meet = await new TeamMeet({
            _id: roomID,
            name : meetname,
            host: [hostID],
            members: [hostID]
        }).save();
        await Team.findByIdAndUpdate(teamid, {
            $push: {
                'meetings': meet._id
            }
        })
    }
    catch(err){
        console.log(err)
    }
}
exports.addTeamMember = async({ roomID, userID }) => {
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
