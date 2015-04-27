(function(){
  var app = angular.module('panel',[]);

  app.controller('panelCtrl', ['$scope',function($scope){

    $scope.tab = 1;
    
    $scope.selectTab = function(tab){
      $scope.tab = tab;
    }

    $scope.isSelected = function(tab){
      return $scope.tab == tab;
    }
  }]);
})();
