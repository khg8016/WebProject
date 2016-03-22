/**
 * Created by Jun on 2016-03-21.
 */
angular.module('index').controller('IndexController', ['Authentication','$scope',
    function(Authentication, $scope){
        $scope.authentication = Authentication;
}]);