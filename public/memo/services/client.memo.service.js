/**
 * Created by Jun on 2016-03-30.
 */
angular.module('memo').factory('Memos', ['$resource',
    function($resource){
        return $resource('api/memos/:memoId', {
            memoId : '@_id'
        }, {
            update: {
                method : 'PUT'
            }
        });
    }
]);