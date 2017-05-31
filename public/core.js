'use strict';

let cardTracker = angular.module('cardTracker', []);

function mainController($scope, $http) {
  $scope.formData = {};
  $('#update').css('display', 'none');
  $('#delete').css('display', 'none');



  $http.get('/api/cards').success(function (data) {
    $scope.cards = data;
    console.log(data);
  }).error(function (data) {
    console.log('err: ' + data);
  });

  $scope.createCard = function () {
    $http.post('/api/cards', $scope.formData).success(function (data) {
      $scope.cards = data;
      clear();
      console.log(data);
    }).error(function (data) {
      console.log('err: ' + data);
    });
  };

  $scope.updateCard = function () {
    if ($scope.selectedCard) {
      $http.put('/api/cards/' + $scope.selectedCard._id, $scope.formData).success(function (data) {
        $scope.cards = data;
        clear();
        console.log(data);
      }).error(function (data) {
        console.log('err: ' + data);
      });
    }
  };

  $scope.deleteCard = function () {
    if ($scope.selectedCard) {
      $http.delete('/api/cards/' + $scope.selectedCard._id).success(function (data) {
        $scope.cards = data;
        clear();
        console.log(data);
      }).error(function (data) {
        console.log('err: ' + data);
      });
    }
  };

  $scope.focusCard = function (id) {
    for (let i = 0; i < $scope.cards.length; i++) {
      if (id === $scope.cards[i]._id)
      $scope.selectedCard = $scope.cards[i];
    }
    $scope.formData = {'name': $scope.selectedCard.name,
                        'text': $scope.selectedCard.text,
                        'rarity': $scope.selectedCard.rarity,
                        'cost': $scope.selectedCard.cost,
                        'attack': $scope.selectedCard.attack,
                        'health': $scope.selectedCard.health,
                        'tribe': $scope.selectedCard.tribe};
    focusButtons();
  };

  $scope.clearForm = clear;

  function clear () {
    $scope.formData = {};
    $scope.selectedCard = undefined;
    $('#add').css('display', 'inline');
    $('#update').css('display', 'none');
    $('#delete').css('display', 'none');
  }

  function focusButtons () {
    $('#add').css('display', 'none');
    $('#update').css('display', 'inline');
    $('#delete').css('display', 'inline');
  }
}
