const Meet = require('../../models/meet');
const User = require('../../models/user');

exports.createMeet = async({ roomID, hostID , meetname}) => {
    
    try{
        const meet = await new Meet({
            _id: roomID,
            name : meetname,
            host: [hostID],
            members: [hostID]
        }).save();
        await User.findByIdAndUpdate(hostID, {
            $push: {
                'meets': meet._id
            }
        })
    }
    catch(err){
        console.log(err)
    }
}
exports.addMember = async({ roomID, userID }) => {
    try{
        await Promise.all([
            User.findByIdAndUpdate(userID, {
                $addToSet: {
                    'meets': roomID
                }
            }),
            Meet.findByIdAndUpdate(roomID, {
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
