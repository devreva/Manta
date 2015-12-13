'use strict';

angular.module('mantaApp')
  .controller('TicketCtrl', function($scope, $http, socket) {
    $scope.tickets = [];
    $http.get('/api/tickets').success(function(tickets) {
      $scope.tickets = tickets;
      socket.syncUpdates('ticket', $scope.tickets);
    });

    $scope.createTicket = function() {
      console.log($scope.ticket.title);
      if ($scope.ticket && $scope.ticket.title) {
        $http.post('/api/tickets', $scope.ticket).success(function() {
          $scope.ticket.title = '';
        });
      }
    };
  });
