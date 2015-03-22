var app = angular.module('starter');
app.service('busyService', ['$rootScope','$q', '$ionicLoading',function ($rootScope, q, $ionicLoading) {


this.show = function(){

	$ionicLoading.show({
    template: '<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0
  });

};

this.hide = function(){
	$ionicLoading.hide();
};

 

}])