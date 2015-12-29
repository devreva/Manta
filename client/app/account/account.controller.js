'use strict';

angular.module('mantaApp')
  .controller('AccountCtrl', function($scope, $http, socket) {
    $scope.users = [];
    $http.get('/api/accounts').success(function(accounts) {
      $scope.accounts = accounts;
      socket.syncUpdates('account', $scope.accounts);
    });

    $scope.createAccount = function() {
      if ($scope.account && $scope.account.name) {
        $http.post('/api/accounts', $scope.account).success(function() {
          $scope.account.name = '';
        });
      }
    };
  });
