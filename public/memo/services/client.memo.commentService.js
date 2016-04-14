/**
 * Created by Jun on 2016-04-13.
 */

angular.module('memo').factory('Comments',['$resource',
    function($resource){
<<<<<<< HEAD
        return $resource('comment/:boardId/:memoId/:commentId', {
            boardId : '@_id',
            memoId : '@_id',
            commentId : '@_id'
=======
        return $resource('comment/:memoId/:commentId', {
            commentId : '@_id',
            memoId : '@_id'
>>>>>>> 0da6a2d9ac50209742da582ff26c76c6afe5160b
        }, {
            update: {
                method : 'PUT'
            }
        });
    }
]);