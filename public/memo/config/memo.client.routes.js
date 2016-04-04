/**
 * Created by Jun on 2016-03-23.
 */

angular.module('memo').config(['$routeProvider',
    function($routeProvider){
        $routeProvider.when('/main/:boardId/memo/create', {
           templateUrl : 'memo/views/client.memo.create.html'
        }).when('/main/:boardId/memo/:memoId/edit', {
            templateUrl : 'memo/views/client.memo.edit.html'
        }).when('/main/:boardId/memo', {
            templateUrl : 'memo/views/client.memo.list.html'
        }).when('/main/:boardId/memo/:memoId/view', {
            templateUrl : 'memo/views/client.memo.view.html'
        });
    }
]);