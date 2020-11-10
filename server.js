var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var port = process.env.PORT || 5000;
app.set('port', port);
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});
server.listen(port, function() {
  console.log('Starting server on port' + port);
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
