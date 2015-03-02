var expect = require('chai').expect;
var supertest = require('supertest');
var express = require('express');

describe('Tutorial router', function () {

    var router;
    before('Get router', function () {
        router = require('../../server/app/routes/tutorial');
    });

    var app;
    beforeEach('Create app', function () {
        app = express();
        app.use('/tut', router);
    });

    var requester;
    beforeEach('Create a fake requester', function () {
        requester = supertest(app);
    });

    it('should be a function', function () {
       expect(router).to.be.a('function');
    });

    it('should respond with json data to /videos', function (done) {
        requester.get('/tut/videos').end(function (err, res) {
            if (err) return done(err);
            expect(res.status).to.be.equal(200);
            expect(res.body.videos).to.be.an('array');
            done();
        });
    });

});

