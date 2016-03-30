/**
 * Created by Jun on 2016-03-30.
 */

angular.module('memo').controller('memoController', ['$scope', '$routeParams', '$location', 'Authentication', 'Memos',
    function($scope, $routeParams, $location, Authentication, Memos){
        $scope.authentication = Authentication;

        $scope.find = function(){
            $scope.memos = Memos.query();
        };

        $scope.findOne = function(){
            $scope.memo = Memos.get({memoId : $routeParams.memoId});
        };

        $scope.create = function(){
            var memo = new Memos({
                title : this.title,
                contents : this.contents
            });
            memo.$save(function(response){
                $location.path('/list')
            }, function(errorResponse){
               $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(memo){
            if(memo){
                memo.$remove(function(){
                    for(var i in $scope.memos){
                        if($scope.memos[i] === memo){
                            $scope.memos.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.memo.$remove(function (){
                    $location.path('/list');
                });
            }
        };

        $scope.update = function(){
            $scope.memo.$update(function(response){
                $location.path('/list')
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
}]);