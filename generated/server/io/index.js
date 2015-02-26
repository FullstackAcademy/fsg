'use strict';
var socketio = require('socket.io');

module.exports = function (server) {

    var io = socketio(server);

    io.on('connection', function (socket) {
        // Now have access to socket, wowzers!
    });

};