const Team = require('../../models/team');
const User = require('../../models/user');

exports.createTeam = async({ req, user }) => {
    try{
        const team = await new Team({
            name : req.body.name,
          description : req.body.description,
          code : Str.random(5),
            members: [user._id]
        }).save();
        await User.findByIdAndUpdate(hostID, {
            $push: {
                'teams': team._id
            }
        })
    }
    catch(err){
        console.log(err)
    }
}
