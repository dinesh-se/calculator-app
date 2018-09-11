'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the calculatorApp
 */
angular.module('calculatorApp')
  .controller('MainCtrl', function ($scope) {
    $scope.evalString = "";
    $scope.result = 0;

    $scope.lastResult = 0;
    $scope.isLastAddedNumber = false;

    $scope.display = function(number) {
      $scope.isLastAddedNumber = true;
      $scope.evalString += number.toString();
      $scope.result = eval($scope.evalString);
    }

    $scope.computeOperation = function(operation) {
      if(!$scope.isLastAddedNumber) {
        $scope.backspace();
        $scope.evalString = $scope.evalString ? $scope.evalString += operation : "";
        return;
      }
      $scope.isLastAddedNumber = false;
      if ($scope.lastResult) {
        $scope.evalString = $scope.lastResult;
      }
      $scope.evalString += operation;
    }

    $scope.equal =  function() {
      if (!$scope.isLastAddedNumber) {
        $scope.backspace();
      }
      $scope.result = eval($scope.evalString);
      $scope.lastResult = $scope.result;
      $scope.evalString = "";
    }

    $scope.clear = function() {
      $scope.result = 0;
      $scope.evalString = "";
      $scope.lastResult = 0;
      $scope.isLastAddedNumber = false;
    }

    $scope.backspace = function() {
      $scope.evalString = $scope.evalString.slice(0, -1);
    }
  });
