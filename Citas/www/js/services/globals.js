var app = angular.module('starter');

app.service('globalService', [function () {
	
	this.hubUrl = function(){
		return "http://hefesoftrealtime.azurewebsites.net/token";
	}

	this.webApi = function(){
		return "http://localhost:7594/api/SignUp";
	}

	this.url = function(){
		//return "http://hefesoftrealtime.azurewebsites.net/token";
		return "http://localhost:52544";
	}

}]) 