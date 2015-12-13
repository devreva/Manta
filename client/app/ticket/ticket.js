'use strict';

angular.module('mantaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('ticket', {
        url: '/ticket',
        templateUrl: 'app/ticket/ticket.html',
        controller: 'TicketCtrl'
      });
  });
