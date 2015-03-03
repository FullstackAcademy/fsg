'use strict';
var express = require('express');
var app = express();
module.exports = app;

require('./configure')(app);

app.use('/api', require('./routes'));

app.get('/*', function (req, res) {

    if (req.get('Referer')) return res.status(404).end();
    
    res.sendFile(app.get('indexHTMLPath'));

});

// Error catching endware.
app.use(function (err, req, res, next) {
    res.status(err.status).send({ error: err.message });
});
