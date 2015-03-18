var ChatHubWrapper = function () {
            var self = this;
            var chat = null;            
            var onMessageCallback = function () { };

            self.useBearerToken = function (token) {
                setTokenCookie(token);
            };

            function setTokenCookie(token) {
                if (token)
                    document.cookie = "BearerToken=" + token + "; path=/";
            }

            self.clearAuthentication = function () {
                document.cookie = "BearerToken=; path=/; expires=" + new Date(0).toUTCString();
            }

            self.inicializarProxy = function(nombreMetodoOir){
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
            });

                //Para que acepte cross domain
                connection.start({jsonp : true}).done(function(){                    
                    console.log("Proxy inicializado");
                });
            }
        };

        var chatHub = new ChatHubWrapper();
        // clear token cookie when page reloads
        chatHub.clearAuthentication();

        // example of WebAPI call using bearer token
        var bearerToken = null;
        var proxy;
        