/**
 * Created by Jun on 2016-03-22.
 */
angular.module('ErrorMessageCtrl', ['$scope', 'ErrorMessage',
    function($scope, ErrorMessage){
        $scope.errorMessage = ErrorMessage;
    }
]);