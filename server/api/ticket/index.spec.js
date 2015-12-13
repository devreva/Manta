'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ticketCtrlStub = {
  index: 'ticketCtrl.index',
  show: 'ticketCtrl.show',
  create: 'ticketCtrl.create',
  update: 'ticketCtrl.update',
  destroy: 'ticketCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ticketIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ticket.controller': ticketCtrlStub
});

describe('Ticket API Router:', function() {

  it('should return an express router instance', function() {
    ticketIndex.should.equal(routerStub);
  });

  describe('GET /api/tickets', function() {

    it('should route to ticket.controller.index', function() {
      routerStub.get
        .withArgs('/', 'ticketCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tickets/:id', function() {

    it('should route to ticket.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'ticketCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tickets', function() {

    it('should route to ticket.controller.create', function() {
      routerStub.post
        .withArgs('/', 'ticketCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tickets/:id', function() {

    it('should route to ticket.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'ticketCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tickets/:id', function() {

    it('should route to ticket.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'ticketCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tickets/:id', function() {

    it('should route to ticket.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'ticketCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
