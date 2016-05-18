var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	io.emit('chat message', 'a user has joined');

	socket.on('chat message', function(msg) {
		// emit message to everyone in the group
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function() {
		io.emit('disconnect', 'a user has left');
	});

});

http.listen('3000', function() {
	console.log('server listening on port 3000');
});

