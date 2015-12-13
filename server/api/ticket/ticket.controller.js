/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tickets              ->  index
 * POST    /api/tickets              ->  create
 * GET     /api/tickets/:id          ->  show
 * PUT     /api/tickets/:id          ->  update
 * DELETE  /api/tickets/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Ticket = require('./ticket.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Tickets
exports.index = function(req, res) {
  Ticket.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Ticket from the DB
exports.show = function(req, res) {
  Ticket.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Ticket in the DB
exports.create = function(req, res) {
  Ticket.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Ticket in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Ticket.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Ticket from the DB
exports.destroy = function(req, res) {
  Ticket.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
