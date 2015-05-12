'use strict';
var VIDEOS = require('./videos.json');

var router = require('express').Router();
module.exports = router;

router.get('/videos', function (req, res) {
    res.send(VIDEOS);
});