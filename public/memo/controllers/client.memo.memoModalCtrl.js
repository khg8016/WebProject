/**
 * Created by Jun on 2016-04-06.
 */

angular.module('memo').controller('memoModalController', ['$scope', '$location', '$routeParams', '$route','close', 'Authentication', 'Memos', 'Comments',
    function($scope, $location, $routeParams, $route, close, Authentication, Memos, Comments) {
        $scope.authentication = Authentication;
        $scope.memo = Memos.get({boardId: $routeParams.boardId, memoId : $routeParams.memoId},
            function(response){
                $scope.comments = $scope.memo.comments;
            }
        );

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
                }
            );
        };

        $scope.makeComment = function(){
            var comment = new Comments({
               content : this.comment
            });

            comment.$save({boardId: $routeParams.boardId, memoId: $routeParams.memoId},
                function(response){
                    $scope.cc = response.content;
                    $scope.comment = "";
                    $scope.comments = Comments.query({boardId: $routeParams.boardId,
                        memoId : $routeParams.memoId});
                    //angular.element("#addedComment").append('<span data-ng-bind="cc"></span>');
                }, function(errorResponse){
                    $scope.error = errorResponse.data.message;
                });
        };

        $scope.deleteComment = function(comment){
            if(comment) {
                $scope.comments.$remove({boardId: $routeParams.boardId, memoId: $routeParams.memoId},
                    function (response) {
                        for(var i in $scope.comments){
                            if($scope.comments[i] === comment){
                                $scope.comments.splice(i, 1);
                            }
                        }
                    }, function (errorResponse) {
                        $scope.error = errorResponse.data.message;
                    }
                );
            }
        };


    }
]);