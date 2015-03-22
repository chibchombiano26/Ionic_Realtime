var app = angular.module('starter');
app.service('signalrService', ['$rootScope','$q',function ($rootScope, q) {
	
	var username;
	var self = this;
	var deferred = q.defer();

	this.login  = function (userName, password) {
		username = userName; 
		
            $.post("http://hefesoftrealtime.azurewebsites.net/token", { grant_type: "password", username: userName, password: password })
                .done(function (data) {
                    if (data && data.access_token) {
                        chatHub.useBearerToken(data.access_token);
                        bearerToken = data.access_token;
                        self.inicializarProxy("broadcastMessage");
                        console.log("Login successful");                        
                    }
                })
                .fail(function (xhr) {
                    if (xhr.status == 400) {
                        console.log("Invalid user name or password");
                        deferred.reject("Invalid user name or password");
                    } else {
                        console.log("Unexpected error while signing in");
                    }
                });

                return deferred.promise;
        };

    this.inicializarProxy = function(nombreMetodoOir){    			
                $.connection.hub.logging = true;               
                //La url a la que nos deseamos conectar
                var connection = $.hubConnection("http://hefesoftrealtime.azurewebsites.net/");

                connection.error(function (error) {
                        console.log('SignalR error: ' + error)
                });

                //Nombre del hub a conectar
                proxy = connection.createHubProxy("chatHub");

                proxy.on("broadcastMessage", function (name, message) {
                console.log(name + ' ' + message);
                $rootScope.$broadcast('signalrOn', name, message);

            });

                //Para que acepte cross domain
            connection.start({jsonp : true}).done(function(){            	               
                console.log("Proxy inicializado");
                deferred.resolve('Proxy inicializado');     
            });
    };


    this.sendMessage = function(data){
    	proxy.invoke('send', username, data);
    };

}])