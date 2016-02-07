'use strict';


angular.module('mantaApp')
  .controller('TicketCtrl', function($scope, $http, socket) {
    $scope.statusNames = ['Todo', 'Next', 'Now', 'Finished'];
    $http.get('/api/tickets').success(function(tickets) {
      $scope.createDataSet4Show(tickets);
      $scope.syncTickets = tickets;
      socket.syncUpdates('ticket', $scope.syncTickets, $scope.createDataSet4Show);
    })

    $scope.createDataSet4Show = function(tickets) {
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

    $scope.updateTicket = function() {
      if (this.item._id && this.item.isEditing) {
        $http.put('/api/tickets/' + this.item._id, {
          title: this.item.title
        });
      }
      this.item.isEditing = false;
    };

    $scope.onDrop = function(event, ui, status) {
      if (this.item._id) {
        $http.put('/api/tickets/' + this.item._id, {
          status: status
        });
      }
    };
  });
