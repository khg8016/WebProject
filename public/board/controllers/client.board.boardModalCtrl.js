/**
 * Created by Jun on 2016-04-06.
 */
angular.module('board').controller('boardModalController', ['$scope', '$location', '$routeParams','close', 'Board',
    function($scope, $location, $routeParams, close, Board) {
        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main');
        };

        $scope.create = function(){ //보드 생성

            var board = new Board({
                name : this.name
            });

            board.$save(function(response){
                $location.path('/main/');
                close(100);
                console.log('save');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });

        };

        $scope.findOne = function(){ //특정 보드 찾음
            console.log("find in board");
            $scope.board = Board.get({boardId : $routeParams.boardId});
        };

        $scope.delete = function(){// 보드 제거
            $scope.board.$remove(function (){
                $location.path('/main');
            });
        };
    }
]);