const Meet = require('../../models/meet');
const User = require('../../models/user');

exports.createMeet = async({ roomID, hostID }) => {
    try{
        const meet = await new Meet({
            _id: roomID,
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

