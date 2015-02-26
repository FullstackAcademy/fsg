'use strict';
var express = require('express');
var app = express();
module.exports = app;
require('./configure')(app);

app.use('/api', require('./routes'));

app.get('/*', function (req, res) {

    if (req.xhr) {
        return res.status(404).send('You are probably looking for something that starts with /api.');
    }

    res.sendFile(app.get('indexHTMLPath'));

});

// Error catching endware.
app.use(function (err, req, res, next) {
    res.status(err.status).send({ error: err.message });
});
