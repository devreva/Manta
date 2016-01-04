'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
  title: String,
  description: String,
  status: Number
});

module.exports = mongoose.model('Ticket', TicketSchema);
