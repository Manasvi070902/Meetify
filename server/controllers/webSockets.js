const socket = require('socket.io')
const http = require('http')
const uuid = require('uuid')
const getTokenDetails = require("../middleware/verifytoken");

const { createMeet} = require('./meets/meets');

const webSockets = app => {
  
    const server = http.createServer(app);
    const io = socket(server)
   
    io.on("connection", (socket) => {
        console.log("connection")
    
        socket.on("start meet",  async(token) => {
            console.log("!!!!")
         
            try{
                
                const { id, name } = await getTokenDetails(token)
                const roomID = uuid.v4()
                socket.roomID = roomID
                socket.isHost = true
                socket.userName = name
                socket.join(roomID)
                io.to(socket.id).emit("roomID", roomID)
                createMeet({
                    roomID,
                    hostID: id
                })
                console.log("starting meet at",socket.id)
            }
            catch(err){
                console.log(err)
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

