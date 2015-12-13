'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var accountCtrlStub = {
  index: 'accountCtrl.index',
  show: 'accountCtrl.show',
  create: 'accountCtrl.create',
  update: 'accountCtrl.update',
  destroy: 'accountCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var accountIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './account.controller': accountCtrlStub
});

describe('Account API Router:', function() {

  it('should return an express router instance', function() {
    accountIndex.should.equal(routerStub);
  });

  describe('GET /api/accounts', function() {

    it('should route to account.controller.index', function() {
      routerStub.get
        .withArgs('/', 'accountCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/accounts/:id', function() {

    it('should route to account.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'accountCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/accounts', function() {

    it('should route to account.controller.create', function() {
      routerStub.post
        .withArgs('/', 'accountCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/accounts/:id', function() {

    it('should route to account.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'accountCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/accounts/:id', function() {

    it('should route to account.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'accountCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/accounts/:id', function() {

    it('should route to account.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'accountCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
