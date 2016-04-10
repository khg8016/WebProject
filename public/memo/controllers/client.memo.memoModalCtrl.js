/**
 * Created by Jun on 2016-04-06.
 */

angular.module('memo').controller('memoModalController', ['$scope', '$location', '$routeParams','close', 'Authentication', 'Memos',
    function($scope, $location, $routeParams, close, Authentication, Memos) {

        $scope.authentication = Authentication;
        $scope.memo = Memos.get({boardId: $routeParams.boardId,
                                  memoId : $routeParams.memoId});

        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main/' + $routeParams.boardId + '/memo');
        };

        $scope.delete = function(){

                $scope.memo.$remove({boardId: $routeParams.boardId},
                    function (){
                        close(100);
                        $location.path('/main/' + $routeParams.boardId + '/memo');
                    });

        };

        $scope.update = function(){
            $scope.memo.$update({boardId: $routeParams.boardId},
                function(response){
                    close(100);
                    $location.path('/main/' + $routeParams.boardId + '/memo');
                }, function(errorResponse){
                    $scope.error = errorResponse.data.message;
                });
        };


    }
]);