/**
 * Created by Jun on 2016-03-30.
 */

angular.module('memo').controller('memoController', ['$scope', 'Memos', '$routeParams',
    function($scope, $routeParams, Memos){
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
                $location.path('/#!/list')
            }, function(errorResponse){
               $scope.error = errorResponse.data.message;
            });
        };
        $scope.delete = function(){

        };
        $scope.update = function(){

        };
}]);