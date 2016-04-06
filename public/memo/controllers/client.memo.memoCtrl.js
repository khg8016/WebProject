/**
 * Created by Jun on 2016-03-30.
 */

angular.module('memo').controller('memoController', ['$scope', '$routeParams', '$location', 'ModalService','Authentication', 'Memos', 'Board',
    function($scope, $routeParams, $location, ModalService, Authentication, Memos, Board){
        $scope.authentication = Authentication;
        $scope.boardId = $routeParams.boardId;
        $scope.find = function(){
            $scope.memos = Memos.query({boardId: $routeParams.boardId});
        };

        $scope.findOne = function(){
            console.log("aaaaa");
            $scope.memo = Memos.get({boardId: $routeParams.boardId,
                                      memoId : $routeParams.memoId});
        };

        $scope.findBoard = function(){ //특정 보드 찾음
            console.log("find in memo");
            $scope.board = Board.get({boardId : $routeParams.boardId});
        };

        $scope.create = function(){
            var memo = new Memos({
                title : this.title,
                contents : this.contents
            });
            memo.$save({boardId: $routeParams.boardId}, function(response){
                $location.path('/main/' + $routeParams.boardId + '/memo');
            }, function(errorResponse){
               $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(memo){
            if(memo){
                memo.$remove({boardId: $routeParams.boardId},
                    function(){
                    for(var i in $scope.memos){
                        if($scope.memos[i] === memo){
                            $scope.memos.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.memo.$remove({boardId: $routeParams.boardId},
                    function (){
                    $location.path('/main/' + $routeParams.boardId + '/memo');
                });
            }
        };

        $scope.update = function(){
            $scope.memo.$update({boardId: $routeParams.boardId},
                function(response){
                $location.path('/main/' + $routeParams.boardId + '/memo');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.viewInfo = function() {
            ModalService.showModal({
                templateUrl: 'board/views/client.board.info.html',
                controller: "memoModalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };
    }
]);