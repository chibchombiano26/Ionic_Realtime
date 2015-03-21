<<<<<<< HEAD
var myapp =angular.module('starter.controller',[]);

myapp.controller('signUpCtrl', ['$scope','$http','$cordovaToast', function($scope, $http, $cordovaToast){
  
=======
angular.module('starter')
.controller('signUpCtrl', ['$scope','$http','$cordovaToast', function($scope, $http, $cordovaToast){
	
>>>>>>> origin/master
$scope.loginData = {username: '', password: '', email:''};

 $scope.register = function() {     
      var datos = $scope.loginData;
      $http.post('http://localhost:7594/api/SignUp', datos).
      success(function(data, status, headers, config) {       
          //error
          if(data.Errors.length > 0){
             var error = data.Errors[0];

             if(ionic.Platform.platform() !== 'win32'){
                $cordovaToast.showShortTop(error);
             }
             else{
              alert(error);
             }
          }

      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  };

}])