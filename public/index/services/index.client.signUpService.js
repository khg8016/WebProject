/**
 * Created by Jun on 2016-04-09.
 */

angular.module('index').factory('SignUp', ['$resource',
    function($resource){
        return $resource('api/signup');
    }
]);