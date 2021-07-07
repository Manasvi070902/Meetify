const socket = require('socket.io')
const http = require('http')
const uuid = require('uuid')
const getTokenDetails = require("../middleware/verifytoken");

const { createMeet , addMember} = require('./meets/meets');
const { addMessage } = require('./meets/messages');
const webSockets = app => {
  
    const server = http.createServer(app);
    const io = socket(server)
   
    io.on("connection", (socket) => {
        console.log("connection")
    
        socket.on("start meet",  async({token, meetname}) => {
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
                    hostID: id,
                    meetname : meetname
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
                console.log('11111')
                
                const { id, name } = await getTokenDetails(token)
                console.log(name)
                if(!uuid.validate(roomID)){
                    console.log('1')
                    socket.emit("invalid room")
                    return;
                }
                const roomData = io.sockets.adapter.rooms[roomID]
                console.log(roomData)
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
                if(err.name === "LoginError"){
                    socket.emit("unauthorized", "Please login again")
                    return
                }
                socket.emit("something broke", "Something went wrong, please try again!")
            }
        })

        socket.on("sending signal", payload => {
            io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, id: payload.callerID, username: socket.userName });
        });
        socket.on("chatroom", async({ roomID, token }) => {
            try{
                console.log('11')
                
                const { id, name } = await getTokenDetails(token)
                
                socket.roomID = roomID
                socket.userName = name
                
                console.log("join chat room",roomID, socket.id)
                 
                socket.join(roomID)
                
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

       socket.on("message", (message) => {
           console.log(socket.userName)
            socket.broadcast.to(socket.roomID).emit('receive-message', { sender: socket.userName, message,id:socket.id,date: new Date() });
            addMessage({
                meetID: socket.roomID,
                sender : socket.userName,
                message,
                date : new Date()
            })
        })
        socket.on("returning signal", payload => {
            io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
        });
        
    
        socket.on("disconnect", () => {
            socket.broadcast.to(socket.roomID).emit("disconnected", { id: socket.id, username: socket.userName })
        })
        // whiteboard
socket.on('canvas-data', (data)=> {
    socket.broadcast.emit('canvas-data', data);
    
})


//team sockets
socket.on("start teammeet",  async({token, meetname,teamid}) => {
    console.log("!!!!")
 
    try{
        
        const { id, name } = await getTokenDetails(token)
        const roomID = uuid.v4()
        socket.roomID = roomID
        socket.isHost = true
        socket.userName = name
        socket.teamid = teamid
        socket.join(roomID)
        io.to(socket.id).emit("roomID", roomID)
        createTeamMeet({
            roomID,
            hostID: id,
            meetname : meetname,
            teamid :teamid
        })
        console.log("starting teammeet at",socket.id)
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

socket.on("join teamroom", async({ roomID, token }) => {
    try{
        console.log('11111')
        
        const { id, name } = await getTokenDetails(token)
        console.log(name)
        if(!uuid.validate(roomID)){
            console.log('1')
            socket.emit("invalid room")
            return;
        }
        const roomData = io.sockets.adapter.rooms[roomID]
        console.log(roomData)
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
            
            usersInThisRoom1.push({
                id: key,
                username: io.sockets.connected[key].userName
            })
        }
        const usersInThisRoom = Object.keys(roomData.sockets) 
        socket.join(roomID)
        console.log("all teammeet members", usersInThisRoom)
        io.to(socket.id).emit("all teammeet members", usersInThisRoom1);
        addTeamMember({
            roomID,
            userID: id
        })
        console.log("join room",roomID, socket.id)
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

socket.on("team meet message", (message) => {
    console.log(socket.userName)
     socket.broadcast.to(socket.roomID).emit('receive-message', { sender: socket.userName, message,id:socket.id,date: new Date() });
     addTeamMeetMessage({
         meetID: socket.roomID,
         sender : socket.userName,
         message,
         date : new Date(),
         teamid : socket.teamid
     })
 })
 socket.on("team message", (message, teamid) => {
    console.log(socket.userName)
     socket.broadcast.to(teamid).emit('receive-message', { sender: socket.userName, message,id:socket.id,date: new Date() });
     addTeamChatMessage({
         sender : socket.userName,
         message,
         date : new Date(),
         teamid : teamid
     })
 })
    })


    return server
}

module.exports = webSockets;

