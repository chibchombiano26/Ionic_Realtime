var app = angular.module('starter');

app.service('globalService', [function () {
	
	var accessToken;

	this.setToken = function(token){
		accessToken = token;
	}

    this.getHeaders =	function () {
            if (accessToken) {
                return { "Authorization": "Bearer " + accessToken };
            }
     }

	this.hubUrl = function(){
		return "http://hefesoftrealtime.azurewebsites.net/token";
	}

	this.webApi = function(){
		return "http://localhost:7594/api/SignUp";
	}

	this.url = function(){
		//return "http://hefesoftrealtime.azurewebsites.net/token";
		return "http://localhost:7594";
	}

}]) 