/**
 * Created by Jun on 2016-03-31.
 */
'use strict';

angular.module('board').controller('boardController', ['$scope', '$routeParams', '$location', 'ModalService', 'Authentication', 'Board',
    function($scope, $routeParams, $location, ModalService, Authentication, Board){
        $scope.boardId = $routeParams.boardId;
        $scope.authentication = Authentication;

        $scope.findBoards = function(){ //보드들을 찾음
            $scope.boards = Board.query();
        };

        $scope.findMemos = function(){
            $scope.memos = Board.query({boardId : $routeParams.boardId});
        };

        $scope.findOne = function(){ //특정 보드 찾음
            $scope.board = Board.get({boardId : $routeParams.boardId});
        };

        $scope.update = function(){//보드 이름 바꾸기
            $scope.board.$update(function(response){
                $location.path('/main/' + $routeParams.boardId+ "/info");
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(board){// 보드 제거
            if(board){
                board.$remove( function(){
                    for(var i in $scope.boards){
                        if($scope.boards[i] === board){
                            $scope.boards.splice(i, 1);
                        }
                    }
                });
            } /*else
                $scope.board.$remove(function (){
                    $location.path('/main');
                });*/
        };

        $scope.addMember = function(req, res){
            var user = new Board({
                username : this.username
            });

            user.$save({boardId : $routeParams.boardId}, function(response){
                $location.path('/main/' + $routeParams.boardId+ "/info");
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });

        };

        $scope.viewCreate = function() {
            ModalService.showModal({
                templateUrl: 'board/views/client.board.create.html',
                controller: "boardModalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.viewInfo = function() {
            ModalService.showModal({
                templateUrl: 'board/views/client.board.info.html',
                controller: "boardModalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.viewAddMember = function() {
            ModalService.showModal({
                templateUrl: 'board/views/client.board.addMembers.html',
                controller: "boardModalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };
    }
]);

