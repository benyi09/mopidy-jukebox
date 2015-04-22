(function(){
    var app = angular.module('users', []);

    app.controller('userCtrl', [ '$scope', 'User', function($scope, User){

        $scope.user = {
            "id" : "",
            "gender" : "",
            "tracks" : []
        }

        $scope.save = function(name, gender){
            var user = {
                "id" : 5,
                "gender" : gender,
                "name" : name,
                "tracks" : []
            };
            User.post(user).then(
                function(data){
                    console.log(data);
                }
                ,function(error){
                    console.log(error);
                }
            );
        }
    }]);

    app.factory('User', [ '$http', '$q', function($http, $q){
        var user = {
            "id" : 1,
            "gender" : "computer",
            "name" : "computer",
            "tracks" : []
        };

        return{
            get: function(id){
                var deffered = $q.defer();
                if(id > 0){
                    $http.get("app/data/users.json")
                    .success(function(response){
                        var toReturn = _.find(response, function(usr){
                            return usr.id == id;
                        });
                        deffered.resolve(toReturn);
                    })
                    .error(function(err){
                        deffered.reject(err);
                    });
                }else{
                    deffered.resolve(user);
                }
                return deffered.promise;
            },
            post: function(usr){
                var deffered = $q.defer();
                $http.post("app/data/users.json", usr, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                })
                .success(function(response){
                    deffered.resolve(response);
                })
                .error(function(err){
                    deffered.reject(err);
                });

                return deffered.promise;
            }
        }
    }]);

    app.directive('registerUser', function(){
        return{
            restrict: 'E',
            templateUrl: "app/users/user-registration.html"
        }
    });
})();
