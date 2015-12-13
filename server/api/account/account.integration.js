'use strict';

var app = require('../..');
var request = require('supertest');

var newAccount;

describe('Account API:', function() {

  describe('GET /api/accounts', function() {
    var accounts;

    beforeEach(function(done) {
      request(app)
        .get('/api/accounts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          accounts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      accounts.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/accounts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/accounts')
        .send({
          name: 'New Account',
          info: 'This is the brand new account!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newAccount = res.body;
          done();
        });
    });

    it('should respond with the newly created account', function() {
      newAccount.name.should.equal('New Account');
      newAccount.info.should.equal('This is the brand new account!!!');
    });

  });

  describe('GET /api/accounts/:id', function() {
    var account;

    beforeEach(function(done) {
      request(app)
        .get('/api/accounts/' + newAccount._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          account = res.body;
          done();
        });
    });

    afterEach(function() {
      account = {};
    });

    it('should respond with the requested account', function() {
      account.name.should.equal('New Account');
      account.info.should.equal('This is the brand new account!!!');
    });

  });

  describe('PUT /api/accounts/:id', function() {
    var updatedAccount

    beforeEach(function(done) {
      request(app)
        .put('/api/accounts/' + newAccount._id)
        .send({
          name: 'Updated Account',
          info: 'This is the updated account!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAccount = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAccount = {};
    });

    it('should respond with the updated account', function() {
      updatedAccount.name.should.equal('Updated Account');
      updatedAccount.info.should.equal('This is the updated account!!!');
    });

  });

  describe('DELETE /api/accounts/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/accounts/' + newAccount._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when account does not exist', function(done) {
      request(app)
        .delete('/api/accounts/' + newAccount._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
