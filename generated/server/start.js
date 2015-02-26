'use strict';
var chalk = require('chalk');
var path = require('path');
var mongoose = require('mongoose');

// Server instance.
var server = require('http').createServer();

var startDb = require('./db');

// Express application.
var app = require(path.join(__dirname, './app'));
server.on('request', app); // Attach the Express application.
require('./io')(server);   // Attach socket.io.

var startServer = function () {

    var User = mongoose.model('User');

    User.create({ email: 'joedotjs@gmail.com', password: 'testing' }).then(function () {
        var PORT = process.env.PORT || 1337;

        server.listen(PORT, function () {
            console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
        });
    });


};

startDb.then(startServer).catch(function (err) {
    console.error('Server initialization error:', chalk.red(err.message));
});


