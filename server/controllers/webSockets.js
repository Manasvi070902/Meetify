const socket = require('socket.io')
const http = require('http')
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const { createMeet} = require('../utils/meets');

const webSockets = app => {
    const server = http.createServer(app);
    const io = socket(server)

    io.on("connection", (socket) => {
        console.log("connection")
    
        socket.on("start meet", ensureAuthenticated, async(req,res) => {
            try{
                const { id, name } = req.user
                console.log(name , id)
                const roomID = meet1
                socket.roomID = roomID
                socket.isHost = true
                socket.userName = name
                socket.join(roomID)
                io.to(socket.id).emit("roomID", roomID)
                createMeet({
                    roomID,
                    hostID: id
                })
                console.log("start meet",socket.id)
            }
            catch(err){
                if(err.name === "LoginError"){
                    socket.emit("unauthorized", "Please login again")
                    return
                }
                socket.emit("something broke", "Oops! Something went wrong, please try again!")
            }
        })
    })
    
    return server
}

module.exports = webSockets;
