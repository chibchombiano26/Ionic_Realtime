var app = angular.module('starter');
app.service('signalrService', ['$rootScope','$q', 'loginService', 'globalService',function ($rootScope, q, loginService, globalService) {
	
	var username;
	var self = this;
	var deferred = q.defer();

	this.login  = function (userName, password) {
        loginService.login(userName, password).then(success, error);
        return deferred.promise;
    };


    function success(data){
        username = data.userName;
        chatHub.useBearerToken(data.data.access_token);
        bearerToken = data.data.access_token;
        self.inicializarProxy("broadcastMessage");
    }

    function error(msg){
        deferred.reject(msg);
    }

    this.inicializarProxy = function(nombreMetodoOir){    			
                $.connection.hub.logging = true;               
                //La url a la que nos deseamos conectar
                var connection = $.hubConnection(globalService.url());

                connection.error(function (error) {
                        console.log('SignalR error: ' + error)
                });

                //Nombre del hub a conectar
                proxy = connection.createHubProxy("chatHub");

                proxy.on("broadcastMessage", function (name, message) {
                console.log(name + ' ' + message);
                $rootScope.$broadcast('signalrOn', name, message);

            });


            //connection.qs = { Bearer: bearerToken};
                //Para que acepte cross domain
            connection.start({jsonp : true}).done(function(){ 
                console.log("Proxy inicializado");
                deferred.resolve('Proxy inicializado');     
            }
            );
    };


    this.sendMessage = function(data){       
    	proxy.invoke('SendMessage', data);
    };

}])