angular.module('starter.controllers.listado', ['ionic'])

.controller('ListadoCtrl', ['$scope', 'signalrService','$rootScope', function ($scope, $signalrService, $rootScope) {
	$scope.playlists = [
    { title: 'Jose', id: 1 },
    { title: 'Douglas', id: 2 }    
  ];

  $signalrService.login('jose123','clave123456').then(resultado, error);

  $rootScope.$on('signalrOn', onMessageReceived);
  
  function resultado(data){
  	//alert(data.access_token);
  	$signalrService.sendMessage("Prueba douglas");
  };

  function error(data){
  	console.log(data);
  };

  function onMessageReceived(objeto, name, message){
  	$scope.playlists.push({title: message, id : message})
  	$scope.$apply();
  };

}])