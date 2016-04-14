/**
 * Created by Jun on 2016-04-13.
 */

angular.module('memo').factory('Comments',['$resource',
    function($resource){
        return $resource('comment/:boardId/:memoId/:commentId', {
            boardId : '@_id',
            memoId : '@_id',
            commentId : '@_id'
        }, {
            update: {
                method : 'PUT'
            }
        });
    }
]);