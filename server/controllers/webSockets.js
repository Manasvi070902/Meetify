const socket = require('socket.io')
const http = require('http')
const uuid = require('uuid')
const getTokenDetails = require("../middleware/verifytoken");

const { createMeet, addMember } = require('./meets/meets');
const { addMessage } = require('./meets/messages');
const { createTeamMeet, addTeamMeetMember } = require('./teams/teammeet');
const { addTeamMeetMessage, addTeamChatMessage } = require('./teams/teammessages');


const webSockets = app => {

    const server = http.createServer(app);
    const io = socket(server)

    //socket connection
    io.on("connection", (socket) => {
        console.log("connection")

        //start meeting
        socket.on("start meet", async ({ token, meetname }) => {

            //debugging purpose
            console.log("start meet socket called!")

            try {

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
                    meetname: meetname
                })
                console.log("starting meet at", socket.id)
            }
            catch (err) {
                console.log(err)

                socket.emit("something broke", "Something went wrong, please LOGIN again!")
            }
        })

        //join members to meet
        socket.on("join room", async ({ roomID, token }) => {
            try {
                console.log('11111')

                const { id, name } = await getTokenDetails(token)
                console.log(name)
                if (!uuid.validate(roomID)) {
                    console.log('1')
                    socket.emit("invalid room")
                    return;
                }
                const roomData = io.sockets.adapter.rooms[roomID]
                console.log(roomData)
                if (!roomData) {
                    socket.emit("invalid room")
                    return;
                }
                if (roomData.length > 100) {
                    socket.emit("room full")
                    return;
                }
                socket.roomID = roomID
                socket.userName = name

                //details of users in that meet
                const usersInThisRoom1 = []
                for (let key in roomData.sockets) {
                    console.log(io.sockets.connected[key].userName)

                    usersInThisRoom1.push({
                        id: key,
                        username: io.sockets.connected[key].userName
                    })
                }
                const usersInThisRoom = Object.keys(roomData.sockets)
                socket.join(roomID)
                //emit details to frontend
                console.log("all members", usersInThisRoom)
                io.to(socket.id).emit("all members", usersInThisRoom1);
                addMember({
                    roomID,
                    userID: id
                })
                console.log("join room", roomID, socket.id)
            }
            catch (err) {
                console.log(err)
                //firebase token error
                socket.emit("something broke", "Something went wrong, please LOGIN again!")
            }
        })

        socket.on("sending signal", payload => {
            io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, id: payload.callerID, username: socket.userName });
        });

        //chat message room during meet
        socket.on("chatroom", async ({ roomID, token }) => {
            try {
                console.log('chat room socket connection called!!')

                //get user details from firebase token
                const { id, name } = await getTokenDetails(token)

                socket.roomID = roomID
                socket.userName = name

                console.log("join chat room", roomID, socket.id)

                socket.join(roomID)

            }
            catch (err) {
                console.log(err)
                //firebase login error token refresh issue
                socket.emit("something broke", "Something went wrong, please LOGIN again!")
            }
        })

        //handle realtime messaging
        socket.on("message", (message) => {
            console.log(socket.userName)
            socket.broadcast.to(socket.roomID).emit('receive-message', { sender: socket.userName, message, id: socket.id, date: new Date() });
            addMessage({
                meetID: socket.roomID,
                sender: socket.userName,
                message,
                date: new Date()
            })
        })
        socket.on("returning signal", payload => {
            io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
        });


        //disconnect user
        socket.on("disconnect", () => {
            socket.broadcast.to(socket.roomID).emit("disconnected", { id: socket.id, username: socket.userName })
        })
        // whiteboard
        socket.on('canvas-data', (data) => {
            socket.broadcast.emit('canvas-data', data);

        })


        //team section sockets
        socket.on("start teammeet", async ({ token, meetname, teamid }) => {
            console.log("start team meet called!")

            try {

                const { id, name } = await getTokenDetails(token)
                const roomID = uuid.v4()
                socket.roomID = roomID
                socket.isHost = true
                socket.userName = name
                socket.join(roomID)
                io.to(socket.id).emit("roomID", roomID)
                createTeamMeet({
                    roomID,
                    hostID: id,
                    meetname: meetname,
                    teamid: teamid
                })
                console.log("starting teammeet at", socket.id)
            }
            catch (err) {
                console.log(err)

                socket.emit("something broke", "Something went wrong, please try again!")
            }
        })

        //join team meet
        socket.on("join teamroom", async ({ roomID, token }) => {
            try {
                //debugging purpose
                console.log('joim team meet socket called')

                const { id, name } = await getTokenDetails(token)
                console.log(name)
                if (!uuid.validate(roomID)) {
                    console.log('1')
                    socket.emit("invalid room")
                    return;
                }
                const roomData = io.sockets.adapter.rooms[roomID]
                console.log(roomData)
                if (!roomData) {
                    socket.emit("invalid room")
                    return;
                }
                if (roomData.length > 100) {
                    socket.emit("room full")
                    return;
                }
                socket.roomID = roomID
                socket.userName = name

                const usersInThisRoom1 = []
                for (let key in roomData.sockets) {
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
                addTeamMeetMember({
                    roomID,
                    userID: id
                })
                console.log("join room", roomID, socket.id)
            }
            catch (err) {
                console.log(err)

                socket.emit("something broke", "Something went wrong, please LOGIN again!")
            }
        })

        //team meet realtime message socket during meetings
        socket.on("team meet message", ({ message, teamid }) => {
            console.log(socket.userName)
            socket.broadcast.to(socket.roomID).emit('receive-message', { sender: socket.userName, message, id: socket.id, date: new Date() });
            addTeamMeetMessage({
                meetID: socket.roomID,
                sender: socket.userName,
                message,
                date: new Date(),
                teamid: teamid
            })
        })
        
        //realtime team message before and after team meetings
        socket.on("team message", ({ message, teamid }) => {
            console.log(socket.userName)
            socket.broadcast.to(teamid).emit('receive-message', { sender: socket.userName, message, id: socket.id, date: new Date() });
            addTeamChatMessage({
                sender: socket.userName,
                message,
                date: new Date(),
                teamid: teamid
            })
        })
    })


    return server
}

module.exports = webSockets;

