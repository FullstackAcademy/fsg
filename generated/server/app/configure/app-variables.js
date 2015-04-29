'use strict';
var path = require('path');
var chalk = require('chalk');
var util = require('util');
var http = require('http');

var rootPath = path.join(__dirname, '../../../');
var indexPath = path.join(rootPath, './server/app/views/index.html');
var faviconPath = path.join(rootPath, './server/app/views/favicon.ico');

var env = require(path.join(rootPath, './server/env'));

var logMiddleware = function (req, res, next) {

    function logReq (req) {
        console.log(chalk.gray(new Date().toString()));
        console.log(chalk.underline(util.format('%s: %s %s', 'REQUEST  ', req.method, req.path)));
        console.log(util.format('%s: %s', 'QUERY    ', util.inspect(req.query)));
        console.log(util.format('%s: %s', 'BODY     ', util.inspect(req.body)));
    }

    function logRes (res, diff) {
        var status = res.statusCode;
        var meaning = http.STATUS_CODES[status];
        var statusColor =
            (status >= 500) ? 'red' :
            (status >= 400) ? 'yellow' :
            (status >= 300) ? 'cyan' :
            /* code >= 200 */ 'green';
        console.log(util.format('RESPONSE : ' + chalk[statusColor]('%s %s ') + chalk.gray('(%s ms)'), status, meaning, diff));
    }

    function msDiff (time) {
        var diff = process.hrtime(time);
        // calculates diff in milliseconds, rounded to two decimals
        return Math.round((diff[0] * 1e3 + diff[1] / 1e6) * 100) / 100;
    }

    // composing it all together by attaching to res finish event
    var time = process.hrtime();
    res.on('finish', function(){
        // if req log is not deferred to res end, other req/res logs can occur
        logReq(req);
        logRes(res, msDiff(time));
        // padding to separate from next cycle
        console.log();
    });
    // not handling `close` event (connection terminates without proper `end`)

    next();
};

module.exports = function (app) {
    app.setValue('env', env);
    app.setValue('projectRoot', rootPath);
    app.setValue('indexHTMLPath', indexPath);
    app.setValue('faviconPath', faviconPath);
    app.setValue('log', logMiddleware);
};
