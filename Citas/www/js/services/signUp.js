var app = angular.module('starter');
app.service('signUpService', ['$rootScope','$q', '$http',function ($rootScope, q, $http) {

this.signUp  = function(data) {     
      //var datos = $scope.loginData;

      var deferred = q.defer();
      $http.post( globalService.url() + '/api/SignUp', data).
      success(function(data, status, headers, config) {       
          //error
          if(data.Errors.length > 0){
             var error = data.Errors[0];
             deferred.reject(error);
             if(ionic.Platform.platform() !== 'win32'){
                $cordovaToast.showShortTop(error);
             }
             else{
              alert(error);
             }
          }
          else{
          	deferred.resolve('Proxy inicializado');
          }

      }).
      error(function(data, status, headers, config) {
      	deferred.reject(data);
      });

      return deferred.promise;
  };


}])