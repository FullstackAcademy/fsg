'use strict';
var Q = require('q');
var path = require('path');
var chalk = require('chalk');

var dbConfig = require(path.join(__dirname, '../env')).db;

var uri =
    'mongodb://' +
    dbConfig.hostname +
    ':' +
    dbConfig.port +
    '/' +
    dbConfig.name;

var mongoose = require('mongoose');
var db = mongoose.connect(uri).connection;

// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
require('./models/user');

var startDbPromise = new Q(function (resolve, reject) {
    db.on('open', resolve);
    db.on('error', reject);
});

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
startDbPromise.then(function () {
    console.log(chalk.green('MongoDB connection opened!'));
});

module.exports = startDbPromise;