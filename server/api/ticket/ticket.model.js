'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('Ticket', TicketSchema);
