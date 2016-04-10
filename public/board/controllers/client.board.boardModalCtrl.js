/**
 * Created by Jun on 2016-04-06.
 */
angular.module('board').controller('boardModalController', ['$scope', '$location', '$routeParams', '$route','close', 'Board',
    function($scope, $location, $routeParams,$route, close, Board) {


        $scope.close1 = function(result) {
            close(result, 100);
            $location.path('/main');
        };

        $scope.close2 = function(result) {
            close(result, 100);
            $location.path('/main/' + $routeParams.boardId+ "/memo");
        };

        $scope.create = function(){ //보드 생성
            var board = new Board({
                name : this.name
            });

            board.$save(function(response){
                close(100);
                $location.path('/main/');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });

        };

        $scope.addMember = function(req, res){
            var user = new Board({
                username : this.username
            });

            user.$save({boardId : $routeParams.boardId}, function(response){
                $scope.message = "추가되었습니다."
            }, function(errorResponse){
                $scope.message = errorResponse.data.message;
            });
        };

        $scope.update = function(){//보드 이름 바꾸기
            $scope.board.$update(function(response){
                close(100);
                $route.reload();
                //$location.path('/main/' + $routeParams.boardId+ "/memo");
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);