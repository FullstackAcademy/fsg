'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/tutorial', require('./tutorial'));