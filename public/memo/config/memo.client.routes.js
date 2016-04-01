/**
 * Created by Jun on 2016-03-23.
 */

angular.module('memo').config(['$routeProvider',
    function($routeProvider){
        $routeProvider.when('/main/:boardId/', {
            templateUrl : 'memo/views/client.memo.list.html'
        }).when('/main/:boardId/create', {
           templateUrl : 'memo/views/client.memo.create.html'
        }).when('/main/:boardId/:memoId', {
            templateUrl : 'memo/views/client.memo.view.html'
        });
    }]);