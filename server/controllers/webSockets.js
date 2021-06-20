const socket = require('socket.io')
const http = require('http')
const uuid = require('uuid')
const getTokenDetails = require("../middleware/verifytoken");

const { createMeet , addMember} = require('./meets/meets');

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
                socket.emit("something broke", "Something went wrong, please try again!")
            }
        })
        socket.on("join room", async({ roomID, token }) => {
            try{
                const { id, name } = await getTokenDetails(token)
                if(!uuid.validate(roomID)){
                    socket.emit("invalid room")
                    return;
                }
                const roomData = io.sockets.adapter.rooms[roomID]
                if(!roomData){
                    socket.emit("invalid room")
                    return;
                }
                if(roomData.length > 100){
                    socket.emit("room full")
                    return;
                }
                socket.roomID = roomID
                socket.userName = name
                const usersInThisRoom1 = []
                for(let key in roomData.sockets){
                    console.log(io.sockets.connected[key].userName)
                    console.log(key.userName)
                    usersInThisRoom1.push({
                        id: key,
                        username: io.sockets.connected[key].userName
                    })
                }
                const usersInThisRoom = Object.keys(roomData.sockets) 
                socket.join(roomID)
                console.log("all members", usersInThisRoom)
                io.to(socket.id).emit("all members", usersInThisRoom1);
                addMember({
                    roomID,
                    userID: id
                })
                console.log("join room",roomID, socket.id)
            }
            catch(err){
                console.log(err)
                if(err.name === "JsonWebTokenError"){
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

