/**
 * Created by Jun on 2016-04-06.
 */

angular.module('memo').controller('memoModalController', ['$scope', '$location', '$routeParams', '$route','close', 'Authentication', 'Memos', 'Comments',
    function($scope, $location, $routeParams, $route, close, Authentication, Memos, Comments) {

        $scope.authentication = Authentication;
<<<<<<< HEAD
        $scope.memoToggle = true;
        $scope.memo = Memos.get({boardId: $routeParams.boardId, memoId : $routeParams.memoId});

        $scope.comments = Comments.query({boardId: $routeParams.boardId, memoId : $routeParams.memoId});
        $scope.commentToggle = new Array();
        $scope.cont = new Array();

        $scope.toggleEdit = function(){
                $scope.memoToggle = false;
        };

        $scope.commentToggleEdit = function(comment){
            for(var i in $scope.comments){
                if($scope.comments[i] === comment){
                    $scope.commentToggle[i] = true;
=======
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
>>>>>>> 0da6a2d9ac50209742da582ff26c76c6afe5160b
                }
            }
        };

<<<<<<< HEAD
            $scope.close = function(result) {
                close(result, 100);
                $location.path('/main/' + $routeParams.boardId + '/memo');
            };

            /* $scope.delete = function(){

             $scope.memo.$remove({boardId: $routeParams.boardId},
             function (){
             close(100);
             $location.path('/main/' + $routeParams.boardId + '/memo');
             });

             };
             */
            $scope.update = function(){
                $scope.memo.$update({boardId: $routeParams.boardId},
                    function(response){
                        $scope.memoToggle = true;
                    }, function(errorResponse){
                        $scope.error = errorResponse.data.message;
                    }
                );
            };

            $scope.makeComment = function(){
=======
        $scope.makeComment = function(){
            console.log("mcmc");
>>>>>>> 0da6a2d9ac50209742da582ff26c76c6afe5160b
            var comment = new Comments({
               content : this.comment
            });

            comment.$save({boardId: $routeParams.boardId, memoId: $routeParams.memoId},
<<<<<<< HEAD
                function(comment){
                    $scope.comment = "";
                    $scope.comments.push(comment);

                    $scope.commentToggle[$scope.comments.length] = false;
                }, function(){
                    console.log("Error");
=======
                function(response){
                    console.log("savesave");
                }, function(errorResponse){
                    console.log("fafafa");
                    $scope.error = errorResponse.data.message;
>>>>>>> 0da6a2d9ac50209742da582ff26c76c6afe5160b
                });
        };

        $scope.deleteComment = function(comment){
<<<<<<< HEAD
            if(comment) {
                console.log($scope.comments[0] == comment);
                comment.$remove({boardId: $routeParams.boardId, memoId: $routeParams.memoId, commentId : comment._id},
                    function () {
                        console.log("success");
                        for(var i in $scope.comments){
                            if($scope.comments[i] === comment){
                                $scope.comments.splice(i, 1);
                                $scope.commentToggle.splice(i, 1);
                            }
                        }
                    }, function () {
                        console.log("Error");
=======
            if(comment){
                board.$remove( function(){
                    for(var i in $scope.comments){
                        if($scope.comments[i] === comment){
                            $scope.comments.splice(i, 1);
                        }
>>>>>>> 0da6a2d9ac50209742da582ff26c76c6afe5160b
                    }
                });
            }
        };

        $scope.editComment = function(comment){
            if(comment) {
                comment.$update({boardId: $routeParams.boardId, memoId: $routeParams.memoId, commentId : comment._id},
                    function (comment1) {
                        for(var i in $scope.comments){
                            if($scope.comments[i] === comment)
                                $scope.commentToggle[i] = false;
                               // $scope.comments[i] = comment1;
                        }
                        $scope.comments = Comments.query({boardId: $routeParams.boardId, memoId : $routeParams.memoId});
                        console.log("success");
                    }, function () {
                        console.log("Error");
                    }
                );
            }

        };


    }
]);