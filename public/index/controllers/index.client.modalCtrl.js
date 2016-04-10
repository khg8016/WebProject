/**
 * Created by Jun on 2016-04-05.
 */
angular.module('index').controller('modalController', ['$scope', '$location','close', 'Authentication', 'SignIn', 'SignUp',
    function($scope, $location, close, Authentication, SignIn, SignUp) {

        $scope.message = Authentication.message;

        $scope.close = function(result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        };

        $scope.check = function(){
            $scope.signUpForm.confirm_pw.$setValidity("unique", $scope.password == $scope.confirm_pw);
        };

        $scope.signIn = function(){
             var logInData = new SignIn({
                 username : this.username,
                 password : this.password
             });

            logInData.$save(function(response){
            }, function(errorResponse){
                $scope.message = errorResponse.data.message;
            });

        };

        $scope.signUp = function(){
            console.log("사인업");

            var signUpData = new SignUp({
                username : this.username,
                password : this.password
            });

            signUpData.$save(function(response){
                close(100);
                console.log("savesave");
                $location.path('/main/');
            }, function(errorResponse){
                console.log("failfail");
                $scope.message = errorResponse.data.message;
            });
        };
    }
]);