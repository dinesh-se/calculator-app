'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('calculatorApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should initialize controller with default values', function () {
    expect(scope.result).toBe(0);
    expect(scope.evalString).toBe("");
  });

  it('should reset the values and reset to default', function () {
    scope.result = 10;
    scope.evalString = "10+20";
    scope.clear();
    expect(scope.result).toBe(0);
    expect(scope.evalString).toBe("");
  });

  it('should display 10 when added 1 to the eval expression', function () {
    scope.evalString = "9+";
    scope.display(1);
    expect(scope.evalString).toBe("9+1");
    expect(scope.result).toBe(10);
    expect(scope.isLastAddedNumber).toBe(true);
  });

  it('should append + operator when addition operation is done', function () {
    scope.lastResult = 0;
    scope.isLastAddedNumber = true;
    scope.evalString = "9";
    scope.computeOperation('+');
    expect(scope.evalString).toBe("9+");
  });

  it('should append + operator and eval expression should be last result when it\'s available', function () {
    scope.lastResult = 10;
    scope.isLastAddedNumber = true;
    scope.evalString = "9";
    scope.computeOperation('+');
    expect(scope.evalString).toBe("10+");
  });

  it('should update to - operator when substraction operation is clicked', function () {
    scope.lastResult = 0;
    scope.isLastAddedNumber = false;
    scope.evalString = "9+";
    scope.computeOperation('-');
    expect(scope.evalString).toBe("9-");
  });

  it('should not have any operator when eval expression is empty', function () {
    scope.lastResult = 0;
    scope.isLastAddedNumber = false;
    scope.evalString = "";
    scope.computeOperation('-');
    expect(scope.evalString).toBe("");
  });

  it('should display results and clear eval string when equal to operator is clicked', function () {
    scope.isLastAddedNumber = true;
    scope.evalString = "9+1";
    scope.equal();
    expect(scope.evalString).toBe("");
    expect(scope.result).toBe(10);
    expect(scope.lastResult).toBe(10);
  });

  it('should display results even when extra operator is added at the last of eval expression', function () {
    scope.isLastAddedNumber = false;
    scope.evalString = "9+1+";
    scope.equal();
    expect(scope.evalString).toBe("");
    expect(scope.result).toBe(10);
    expect(scope.lastResult).toBe(10);
  });

  it('should remove last character when backspace is called', function() {
    scope.evalString = "9+1+";
    scope.backspace();
    expect(scope.evalString).toBe("9+1");
  });

});
