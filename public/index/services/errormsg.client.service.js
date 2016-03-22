/**
 * Created by Jun on 2016-03-22.
 */
angular.module('error').factory('ErrorMessage', [
    function(){
        this.message = window.message;
        return {
            message : this.message
        };
}]);