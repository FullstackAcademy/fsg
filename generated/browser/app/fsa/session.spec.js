describe('Session Service', function () {

    beforeEach(module('fsaPreBuilt'));

    var $rootScope;
    beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
    }));

    var Session;
    var AUTH_EVENTS;
    beforeEach(inject(function ($injector) {
        Session = $injector.get('Session');
        AUTH_EVENTS = $injector.get('AUTH_EVENTS');
    }));

    it('should be an object', function () {
        expect(Session).to.be.an('object');
    });

    it('should by default have id and user as null', function () {
        expect(Session.user).to.be.equal(null);
        expect(Session.id).to.be.equal(null);
    });

    describe('create method', function () {

        it('should when called with id and user arguments' +
        'set the id and user to session', function () {
            var id = 'testId';
            var user = {};
            Session.create(id, user);
            expect(Session.user).to.be.equal(user);
            expect(Session.id).to.be.equal(id);
        });

    });

    describe('destroy method', function () {

        it('should set user and id to null', function () {

            Session.user = {};
            Session.id = 1;

            Session.destroy();

            expect(Session.user).to.be.equal(null);
            expect(Session.id).to.be.equal(null);

        });

    });

    describe('event listening', function () {

        it('should call destroy when notAuthenticated event is fired', function () {

            var spy = sinon.spy(Session, 'destroy');

            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);

            expect(spy.called).to.be.ok;
            spy.restore();

        });

        it('should call destroy when sessionTimeout event is fired', function () {

            var spy = sinon.spy(Session, 'destroy');

            $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);

            expect(spy.called).to.be.ok;
            spy.restore();

        });

    });

});