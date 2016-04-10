/**
 * Created by Jun on 2016-04-09.
 */

angular.module('index').factory('SignIn', ['$resource',
    function($resource){
        return $resource('api/signin');
    }
]);