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
  console.log('Starting server on port ' + port);
});
const fs = require('fs');
var clicks;
io.on('connection', function(socket) {
	socket.on('press',function(){
		clicks = fs.readFileSync('clicks.txt','utf8');
		clicks++;
		console.log(clicks);
		fs.writeFile('clicks.txt', clicks, function (err) {
		  if (err) return console.log(err);
		});
	});
});
setInterval(function(){
	io.emit('clicks',clicks);
},100);
