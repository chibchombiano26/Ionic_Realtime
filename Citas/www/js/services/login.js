var app = angular.module('starter');

app.service('loginService', [ '$q', '$http', 'globalService', function ($q, $http, globalService) {
	

this.login  = function (userName, password) {		
		var deferred = $q.defer();
		
            $.post(globalService.url() + "/token", { grant_type: "password", username: userName, password: password })
                .done(function (data) {
                    if (data && data.access_token) {
                    	var result = {userName: userName, password : password, data: data};
                        deferred.resolve(result);
                        chatHub.useBearerToken(data.access_token);
                        bearerToken = data.access_token;
                        globalService.setToken(data.access_token);
                        console.log("Login successful");        


                        $http({
                                method: 'POST',
                                url: globalService.url() +  '/api/SignUp',
                                headers: globalService.getHeaders(),
                                data: {userName : 'jose123', password : 'clave123456'}
                            });


                        
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

}])