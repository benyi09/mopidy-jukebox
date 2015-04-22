(function(){
    var app = angular.module('thejukebox', ['users']);
    app.controller('theJukeBoxController', ['$scope', 'User', function($scope, User){
        $scope.user = '';
        User.get().then(
            function(data){
                $scope.user = data;
                console.log($scope.user);
            }
            ,function(error){
                console.log(error);
            }
        );
    }]);
})();
