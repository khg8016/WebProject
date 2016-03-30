/**
 * Created by Jun on 2016-03-23.
 */

angular.module('memo').config(['$routeProvider',
    function($routeProvider){
        $routeProvider.when('/list', {
            templateUrl : 'memo/views/client.memo.list.html'
        }).when('/memo/create', {
           templateUrl : 'memo/views/client.memo.create.html'
        }).when('/memo/:memoId', {
            templateUrl : 'memo/views/client.memo.view.html'
        });
    }]);