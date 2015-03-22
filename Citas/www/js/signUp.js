angular.module('starter')
.controller('signUpCtrl', [
  '$scope',  
  '$cordovaToast',  
  '$localstorage', 
  'signalrService',
  'signUpService',  
  'busyService',
  function($scope, $cordovaToast, $localstorage, signalrService, signUpService, busyService){	


$scope.loginData = {username: '', password: '', email:''};

$scope.register = function(){
  busyService.show();
  signUpService.signUp($scope.loginData).then(success, error);
};


function success(data){
        signalrService.login($scope.loginData.username, $scope.loginData.password).then(login, error);
};

function login(result){
  var resultado = result;
  $localstorage.setObject('username', $scope.loginData);
  busyService.hide();
}

function error(data){
  busyService.hide();
};

}])