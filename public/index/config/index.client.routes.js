/**
 * Created by Jun on 2016-03-21.
 */
angular.module('index').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'index/views/index.html'
    }).when('/signin', {
        templateUrl: 'index/views/signin.html'
    }).when('/signup', {
        templateUrl: 'index/views/signup.html'
    }).otherwise({
        redirectTo: '/'
    });

}]);


