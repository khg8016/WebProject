/**
 * Created by Jun on 2016-03-30.
 */
angular.module('memo').factory('Memos',['$resource',
    function($resource){
        return $resource('api/main/:boardId/memo/:memoId', {
            boardId : '@_id',
            memoId : '@_id'
        }, {
            update: {
                method : 'PUT'
            }
        });
    }
]);