/**
 * Created by Aplus on 2016-03-22.
 */
angular.module('index').controller('SignupController', ['$scope', '$location',
    function($scope, $location){
        $scope.pw1="";
        $scope.pw2="";
        $scope.msg="";
        $scope.check = function(){
            if($scope.pw1 != $scope.pw2) {
                $scope.msg="비밀번호가 일치하지 않습니다."
            }else{
                $scope.msg="비밀번호가 일치합니다."
            }
        };

        $scope.kk = function(){
            console.log("kk");
            if($scope.pw1 != $scope.pw2) {
                return false;
            }else
                return true;
        };
    }
]);