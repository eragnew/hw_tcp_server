'use strict';

var net = require('net');
var shortid = require('shortid');
var fs = require('fs');

function logConnection(logMsg, fileID) {
  var newFilePath = './out/' + fileID + '.txt';
  fs.writeFile(newFilePath, logMsg, function(err) {
    if (err) return console.log(err);
    console.log('connection closed, log of connection saved here:');
    console.log(newFilePath);
  });
  return newFilePath;
}

var server = net.createServer(function(socket) {
  var logMsg = 'new connection at: ' + Date() + '\n';
  var newFileID = shortid.generate();
  socket.write('new connection identified by: ' + newFileID);

  socket.on('data', function(data) {
    console.log(data.toString());
    logMsg += data.toString() + '\n';
  });

  socket.on('end', function() {
    logMsg += 'connection closed.\n';
    logConnection(logMsg, newFileID);
  });
});

server.listen(3000);
