/**
 * Created by Jun on 2016-03-21.
 */
angular.module('index').controller('IndexController', ['$scope', 'Authentication', 'ModalService',
    function($scope, Authentication, ModalService){
        $scope.authentication = Authentication;

        $scope.signIn = function() {
            ModalService.showModal({
                templateUrl: 'signin.html',
                controller: "modalController"
            }).then(function(modal) {
                modal.element.modal();
                /*modal.close.then(function(result) {
                    $scope.message = "You said ";
                });*/
            });
        };

        $scope.signUp = function() {
            ModalService.showModal({
                templateUrl: 'signup.html',
                controller: "modalController"
            }).then(function(modal) {
                modal.element.modal();
                /*modal.close.then(function(result) {
                 $scope.message = "You said ";
                 });*/
            });
        };
    }
]);