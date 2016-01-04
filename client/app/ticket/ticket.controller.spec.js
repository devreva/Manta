'use strict';

describe('Controller: TicketCtrl', function() {

  // load the controller's module
  beforeEach(module('mantaApp'));
  var $httpBackend, createController, scope;

  var testSet = [{
    title: 'test1',
    status: 0
  }, {
    title: 'test2',
    status: 0
  }, {
    title: 'test3',
    status: 1
  }];

  var testResultSet = [
    [{
      title: 'test1',
      status: 0
    }, {
      title: 'test2',
      status: 0
    }],
    [{
      title: 'test3',
      status: 1
    }]
  ];

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_) {
    var $rootScope = _$rootScope_;
    var $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', '/api/tickets')
      .respond(testSet);
    scope = $rootScope.$new();
    createController = function() {
      return $controller('TicketCtrl', {
        $scope: scope
      });
    };
  }));

  it('Initiallize ticket', function() {
    var controller = createController();
    $httpBackend.expect('GET', '/api/tickets')
      .respond(testSet);
    $httpBackend.flush();
    expect(scope.tickets).toEqual(testResultSet);
  });


  it('Create ticket', function() {
    var controller = createController();
    $httpBackend.expect('POST', '/api/tickets')
      .respond(201);
    scope.ticket = {
      title: 'test'
    };
    scope.createTicket();
    $httpBackend.flush();
    expect(scope.ticket.title).toEqual('');
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});
