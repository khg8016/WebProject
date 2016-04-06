/**
 * Created by Jun on 2016-04-06.
 */

/**
 * Created by Jun on 2016-04-06.
 */
angular.module('memo').controller('memoModalController', ['$scope', '$location', '$routeParams','close', 'Board', 'Memos',
    function($scope, $location, $routeParams, close, Board) {
        console.log("mmct");
        $scope.board = Board.get({boardId : $routeParams.boardId});

        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main/' + $routeParams.boardId + '/memo');
        };

        $scope.findOne = function(){ //특정 보드 찾음
            console.log("find in memo");
            $scope.board = Board.get({boardId : $routeParams.boardId});
        };

        $scope.delete = function(){// 보드 제거
            console.log("memo delete");
            $scope.board.$remove(function (){
                $location.path('/main/' + $routeParams.boardId + '/memo');
            });
        };
    }
]);