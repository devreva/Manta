'use strict';
describe('Controller: AccountCtrl', function() {

  // load the controller's module
  beforeEach(module('mantaApp'));
  var $httpBackend, createController, scope;

  var testSet = {
    name: 'test'
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_) {
    var $rootScope = _$rootScope_;
    var $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', '/api/accounts')
      .respond(testSet);
    scope = $rootScope.$new();
    createController = function() {
      return $controller('AccountCtrl', {
        $scope: scope
      });
    };
  }));

  it('Initiallize account', function() {
    var controller = createController();
    $httpBackend.expect('GET', '/api/accounts')
      .respond(testSet);
    $httpBackend.flush();
    expect(scope.accounts).toEqual(testSet);
  });


  it('Create account', function() {
    var controller = createController();
    $httpBackend.expect('POST', '/api/accounts')
      .respond(201);
    scope.account = {
      name: 'test'
    };
    scope.createAccount();
    $httpBackend.flush();
    expect(scope.account.name).toEqual('');
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});
