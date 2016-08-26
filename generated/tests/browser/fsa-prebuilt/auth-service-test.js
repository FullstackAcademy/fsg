describe('AuthService', function () {

    beforeEach(module('fsaPreBuilt'));

    var $httpBackend;
    var $rootScope;
    beforeEach('Get tools', inject(function (_$httpBackend_, _$rootScope_) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));

    var AUTH_EVENTS;
    var AuthService;
    var Session;
    beforeEach('Get factories', inject(function (_AuthService_, _Session_, _AUTH_EVENTS_) {
        AuthService = _AuthService_;
        Session = _Session_;
        AUTH_EVENTS = _AUTH_EVENTS_;
        Session.destroy();
    }));

    it('should be an object', function () {
        expect(AuthService).to.be.an('object');
    });

    describe('isAuthenicated', function () {

        it('should return true if a Session exists', function () {
            Session.create({email: 'cool@gmail.com'});
            expect(AuthService.isAuthenticated()).to.be.ok;
        });

        it('should return false if a Session does not exist', function () {
            Session.destroy();
            expect(AuthService.isAuthenticated()).to.not.be.ok;
        });

    });

    describe('getLoggedInUser', function () {

        it('should return the user from the Session if already authenticated', function (done) {
            var x = {};
            Session.create(x);
            AuthService.getLoggedInUser().then(function (user) {
                expect(user).to.be.equal(x);
                done();
            });
            $rootScope.$digest(); // In order to resolve $q promise.
        });

        describe('when user not already authenticated', function () {

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('should make a request to GET /session', function (done) {

                $httpBackend.expectGET('/session');
                $httpBackend.whenGET('/session').respond({user: {}});

                AuthService.getLoggedInUser().then(function () {
                    done();
                });

                $httpBackend.flush();

            });

            describe('on successful response', function () {

                var potus = {
                    email: 'obama@gmail.com', president: true
                };

                beforeEach(function () {
                    $httpBackend.whenGET('/session').respond({user: potus});
                });

                it('should resolve to the responded user from /session', function (done) {

                    AuthService.getLoggedInUser().then(function (user) {
                        expect(user).to.be.deep.equal(potus);
                        done();
                    });

                    $httpBackend.flush();

                });

                it('should set the session', function (done) {

                    AuthService.getLoggedInUser().then(function (user) {
                        expect(Session.user).to.be.deep.equal(potus);
                        done();
                    });

                    $httpBackend.flush();

                });

                it('should fire off AUTH_EVENTS.loginSuccess', function (done) {

                    var spy = sinon.spy();

                    $rootScope.$on(AUTH_EVENTS.loginSuccess, spy);

                    AuthService.getLoggedInUser().then(function () {
                        expect(spy.called).to.be.ok;
                        done();
                    });

                    $httpBackend.flush();

                });

            });

            it('should resolve to the reponse from /session if it is OK', function (done) {

                var potus = {
                    email: 'obama@gmail.com', president: true
                };

                $httpBackend.whenGET('/session').respond({user: potus});

                AuthService.getLoggedInUser().then(function (user) {
                    expect(user).to.be.deep.equal(potus);
                    done();
                });

                $httpBackend.flush();

            });

            it('should resolve to null if the response was 401/erroneous', function (done) {

                $httpBackend.whenGET('/session').respond(401);

                AuthService.getLoggedInUser().then(function (user) {
                    expect(user).to.be.equal(null);
                    done();
                });

                $httpBackend.flush();

            });

        });

    });

    describe('login', function () {

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should make a request POST /login with the given data', function (done) {

            var potus = {
                email: 'obama@gmail.com',
                password: 'potus'
            };

            $httpBackend.expectPOST('/login', potus).respond(200, {});

            AuthService.login(potus).then(done);

            $httpBackend.flush();

        });

        it('should forward invalid credentials error on unsuccessful response', function (done) {

            $httpBackend.expectPOST('/login').respond(401);

            AuthService.login({ email: 'fakedude@gmail.com', password: 'nop' }).catch(function (err) {
                expect(err.message).to.be.equal('Invalid login credentials.');
                done();
            });

            $httpBackend.flush();

        });

        describe('on successful response', function () {

            var user = {email: 'coolguy@beans.com'};
            var login = {email: 'coolguy@beans.com', password: 'sweetjuicy'};

            beforeEach(function () {
                $httpBackend.whenPOST('/login').respond({user: user});
            });

            it('should resolve to the responded user', function (done) {

                AuthService.login(login).then(function (user) {
                    expect(user).to.be.deep.equal(user);
                    done();
                });

                $httpBackend.flush();

            });

            it('should set Session', function (done) {

                Session.destroy();

                AuthService.login(login).then(function (user) {
                    expect(Session.user).to.be.deep.equal(user);
                    done();
                });

                $httpBackend.flush();

            });

            it('should fire off AUTH_EVENTS.loginSuccess', function (done) {

                var spy = sinon.spy();

                $rootScope.$on(AUTH_EVENTS.loginSuccess, spy);

                AuthService.login(login).then(function () {
                    expect(spy.called).to.be.ok;
                    done();
                });

                $httpBackend.flush();

            });

        });

    });

    describe('logout', function () {

        beforeEach(function () {
            $httpBackend.expectGET('/logout').respond(200);
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should make a request GET /logout', function (done) {
            AuthService.logout().then(done);
            $httpBackend.flush();
        });

        it('should destroy the session', function (done) {

            Session.create({ email: 'obama@gmai.com' });

            AuthService.logout().then(function () {
                expect(Session.user).to.be.equal(null);
                done();
            });

            $httpBackend.flush();

        });

        it('should broadcast the logoutSuccess AUTH_EVENT', function (done) {

            var spy = sinon.spy();

            $rootScope.$on(AUTH_EVENTS.logoutSuccess, spy);

            AuthService.logout().then(function () {
                expect(spy.called).to.be.ok;
                done();
            });

            $httpBackend.flush();

        });

    });

});
