/**
 * Created by Jun on 2016-03-31.
 */
angular.module('board').controller('boardController', ['$scope', '$routeParams', '$location', 'Authentication', 'Board',
    function($scope, $routeParams, $location, Authentication, Board){
        $scope.authentication = Authentication;
        $scope.boardId = $routeParams.boardId

        $scope.findBoards = function(){ //보드들을 찾음
            $scope.boards = Board.query();
        };

        $scope.findMemos = function(){
            $scope.memos = Board.query({boardId : $routeParams.boardId});
        };

        $scope.findOne = function(){ //특정 보드 찾음
            $scope.board = Board.get({boardId : $routeParams.boardId});
        };

        $scope.create = function(){ //보드 생성
            var board = new Board({
                name : this.name
            });

            board.$save(function(response){
                $location.path('/main');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });

        };

        $scope.update = function(){//보드 이름 바꾸기
            $scope.board.$update(function(response){
                $location.path('/main');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(board){// 보드 제거
            if(board){
                board.$remove(function(){
                    for(var i in $scope.boards){
                        if($scope.boards[i] === board){
                            $scope.boards.splice(i, 1);
                        }
                    }
                });
            }/* else {
                $scope.board.$remove(function (){
                    $location.path('/main');
                });
            }*/
        };
    }
]);

