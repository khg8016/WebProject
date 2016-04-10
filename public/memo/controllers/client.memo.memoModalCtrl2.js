/**
 * Created by Jun on 2016-04-06.
 */


angular.module('memo').controller('memoModalController2', ['$scope', '$location', '$routeParams','$route', 'close', 'Memos',
    function($scope, $location, $routeParams, $route, close, Memos) {


        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main/' + $routeParams.boardId + '/memo');
        };

        $scope.create = function(){
            var memo = new Memos({
                title : this.title,
                contents : this.contents
            });

            memo.$save({boardId: $routeParams.boardId}, function(response){
                console.log("savesave");
                $route.reload();
                close(100);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };


    }
]);
