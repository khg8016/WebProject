/**
 * Created by Jun on 2016-04-05.
 */
angular.module('index').controller('modalController', ['$scope', 'close',
    function($scope, close) {
        $scope.close = function(result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        };

        $scope.check = function(){
            $scope.signUpForm.confirm_pw.$setValidity("unique", $scope.password == $scope.confirm_pw);
        };
    }
]);