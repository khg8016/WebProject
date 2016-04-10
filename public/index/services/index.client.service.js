/**
 * Created by Jun on 2016-03-21.
 */
angular.module('index').factory('Authentication', [
    function(){
        this.user = window.user;
        this.message = window.message;
        return {
            user : this.user,
            message : this.message
        };
}]);