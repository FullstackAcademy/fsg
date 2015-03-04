describe('Example angular test', function () {

    beforeEach(module('fsaPreBuilt'));

    var authService;
    beforeEach(inject(function (AuthService) {
        authService = AuthService;
    }));

    it('should properly inject the AuthService', function () {
       expect(authService).to.be.an('object');
    });

});