var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 5000);
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});
var clicks = 0;
io.on('connection', function(socket) {
	socket.on('press',function(){
		clicks++;
	});
});
setInterval(function(){
	io.emit('clicks',clicks);
},100);