/**
 * Created by Jun on 2016-04-06.
 */

angular.module('memo').controller('memoModalController', ['$scope', '$location', '$routeParams', '$route','close', 'Authentication', 'Memos', 'Comments',
    function($scope, $location, $routeParams, $route, close, Authentication, Memos, Comments) {

        $scope.authentication = Authentication;
        $scope.memo = Memos.get({boardId: $routeParams.boardId,
                                  memoId : $routeParams.memoId});

        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main/' + $routeParams.boardId + '/memo');
        };

        $scope.delete = function(){
                $scope.memo.$remove({boardId: $routeParams.boardId}, //보드아디 지워보기
                    function (){
                        close(100);
                        $location.path('/main/' + $routeParams.boardId + '/memo');
                    }
                );
        };

        $scope.update = function(){
            $scope.memo.$update({boardId: $routeParams.boardId}, //보드아디 지워보기
                function(response){
                    close(100);
                    $location.path('/main/' + $routeParams.boardId + '/memo');
                }, function(errorResponse){
                    $scope.error = errorResponse.data.message;
                }
            );
        };

        $scope.makeComment = function(){
            console.log("mcmc");
            var comment = new Comments({
               content : this.comment
            });

            comment.$save({boardId: $routeParams.boardId, memoId: $routeParams.memoId},
                function(response){
                    console.log("savesave");
                }, function(errorResponse){
                    console.log("fafafa");
                    $scope.error = errorResponse.data.message;
                });
        };

        $scope.deleteComment = function(comment){
            if(comment){
                board.$remove( function(){
                    for(var i in $scope.comments){
                        if($scope.comments[i] === comment){
                            $scope.comments.splice(i, 1);
                        }
                    }
                });
            }
        };


    }
]);