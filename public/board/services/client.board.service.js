/**
 * Created by Jun on 2016-03-31.
 */

angular.module('board').factory('Board', ['$resource',
    function($resource){
        return $resource('api/main/:boardId', {
            boardId : '@_id'
        }, {
            update : {
                method : 'PUT'
            }
        });
    }
]);