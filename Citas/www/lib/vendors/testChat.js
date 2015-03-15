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
        
        function signIn(userName, password) {
            return $.post("http://hefesoftrealtime.azurewebsites.net/token", { grant_type: "password", username: userName, password: password })
                .done(function (data) {
                    if (data && data.access_token) {
                        chatHub.useBearerToken(data.access_token);
                        bearerToken = data.access_token;
                        chatHub.inicializarProxy("broadcastMessage");
                        console.log("Login successful");
                    }
                })
                .fail(function (xhr) {
                    if (xhr.status == 400) {
                        console.log("Invalid user name or password");
                    } else {
                        console.log("Unexpected error while signing in");
                    }
                });
        }

        // example of WebAPI call using bearer token
        var bearerToken = null;
        var proxy;
        