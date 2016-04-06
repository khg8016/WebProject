/**
 * Created by Jun on 2016-03-23.
 */

angular.module('memo').config(['$routeProvider',
    function($routeProvider){
        $routeProvider.when('/main/:boardId/memo/create', {
           templateUrl : 'memo/views/client.memo.create.html'
        }).when('/main/:boardId/memo/:memoId/edit', {
            templateUrl : 'memo/views/client.memo.edit.html'
        }).otherwise({
            redirectTo: '/main/:boardId/memo'
        });
    }
]);