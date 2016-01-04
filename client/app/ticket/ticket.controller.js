'use strict';


angular.module('mantaApp')
  .controller('TicketCtrl', function($scope, $http, socket) {
    $scope.statusName = ['Todo', 'Next', 'Now', 'Finished'];
    $http.get('/api/tickets').success(function(tickets) {
      $scope.showTickets(tickets);
      $scope.syncTickets = tickets;
      socket.syncUpdates('ticket', $scope.syncTickets, $scope.showTickets);
    })

    $scope.showTickets = function(tickets) {
      $scope.tickets = [];
      tickets.forEach(function(ticket) {
        if (!$scope.tickets[ticket.status]) {
          $scope.tickets[ticket.status] = [];
        }
        $scope.tickets[ticket.status].push(
          ticket
        );
      });
    }

    $scope.createTicket = function() {
      if ($scope.ticket && $scope.ticket.title) {
        $scope.ticket.status = 0;
        $http.post('/api/tickets', $scope.ticket).success(function() {
          $scope.ticket.title = '';
        });
      }
    };
  });
