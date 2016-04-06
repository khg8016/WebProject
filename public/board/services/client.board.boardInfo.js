/**
 * Created by Jun on 2016-04-06.
 */


angular.module('board').factory('boardInformation', ['$routeParams',
    function($routeParams){
        return {
            id : $routeParams.boardId
        };
    }
]);