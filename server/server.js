const express = require("express");

const app = express();

//sockets
const server = require("http").Server(app);
const io = require("socket.io")(server);

const http = require('http');
var cors = require('cors');



app.set('port', (process.env.PORT || 3001))

connections = {}

io.on('connection', function(socket){

	socket.on('join-call', (path) => {
		if(connections[path] === undefined){
			connections[path] = []
		}
		connections[path].push(socket.id);

		for(let a = 0; a < connections[path].length; ++a){
			io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]);
		}

		console.log(path, connections[path])
	});

    socket.on('signal', (toId, message) => {
		io.to(toId).emit('signal', socket.id, message);
	});

    socket.on('disconnect', function() {
		
		var key;
		for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
			for(let a = 0; a < v.length; ++a){
				if(v[a] === socket.id){
					key = k

					for(let a = 0; a < connections[key].length; ++a){
						io.to(connections[key][a]).emit("user-left", socket.id);
					}
			
					var index = connections[key].indexOf(socket.id);
					connections[key].splice(index, 1);

					console.log(key, socket.id, Math.ceil(diffTime / 1000));

					if(connections[key].length === 0){
						delete connections[key]
					}
				}
			}
		}
	})

});

server.listen(app.get('port'), () => {
	console.log("Listening on : ", app.get('port'))
})
