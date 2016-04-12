/**
 * Created by Jun on 2016-03-21.
 */
angular.module('index').controller('IndexController', ['$scope', '$http', '$route', 'Authentication', 'ModalService',
    function($scope, $http , $route,Authentication, ModalService){
        $scope.authentication = Authentication;

     /*   $scope.c = function() {
            var data = {
                username: this.username,
                password : this.password
            };
            $http({
                method: 'POST',
                url: 'http://localhost:3000/signup',
                data: data
            }).success(function (data) {
                if(data.msg != "")
                    $scope.message = data.msg;
                if(data.msg =="") {
                    window.location = '/webmemo#!/main';
                }
            }).error(function(data){
                console.log("deafs" + data.msg);
                $scope.messgae = data.msg;
            });
        };

        $scope.check = function(){
            $scope.signUpForm.confirm_pw.$setValidity("unique", $scope.password == $scope.confirm_pw);
        };*/

       $scope.modalSignIn = function() {
            ModalService.showModal({
                templateUrl: 'index/views/signin.html',
                controller: "modalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.modalSignUp = function() {
            ModalService.showModal({
                templateUrl: 'index/views/signup.html',
                controller: "modalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };
    }
]);