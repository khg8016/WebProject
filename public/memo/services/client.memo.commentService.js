/**
 * Created by Jun on 2016-04-13.
 */

angular.module('memo').factory('Comments',['$resource',
    function($resource){
        return $resource('comment/:memoId/:commentId', {
            commentId : '@_id',
            memoId : '@_id'
        }, {
            update: {
                method : 'PUT'
            }
        });
    }
]);