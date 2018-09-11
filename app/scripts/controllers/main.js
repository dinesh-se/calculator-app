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

    var lastResult = 0;
    var isLastAddedNumber = false;

    $scope.equal =  function() {
      if (!isLastAddedNumber) {
        $scope.backspace();
      }
      $scope.result = eval($scope.evalString);
      lastResult = $scope.result;
      $scope.evalString = "";
    }

    $scope.clear = function() {
      $scope.result = 0;
      $scope.evalString = "";
      lastResult = 0;
      isLastAddedNumber = false;
    }

    $scope.display = function(number) {
      isLastAddedNumber = true;
      $scope.evalString += number.toString();
      $scope.result = eval($scope.evalString);
    }

    $scope.computeOperation = function(operation) {
      if(!isLastAddedNumber) {
        $scope.backspace();
        $scope.evalString = $scope.evalString ? $scope.evalString += operation : "";
        return;
      }
      isLastAddedNumber = false;
      if (lastResult) {
        $scope.evalString = lastResult;
      }
      $scope.evalString += operation;
    }

    $scope.backspace = function() {
      $scope.evalString = $scope.evalString.slice(0, -1);
    }
  });
