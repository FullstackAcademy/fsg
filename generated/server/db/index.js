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

var startDbPromise = new Q(function (resolve, reject) {
    db.on('open', resolve);
    db.on('error', reject);
});

require('./models/user');

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
startDbPromise.then(function () {
    console.log(chalk.green('MongoDB connection opened!'));
});

module.exports = startDbPromise;