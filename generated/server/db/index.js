'use strict';
var db = require('./_db');
module.exports = db;

require('./models/user')(db);

