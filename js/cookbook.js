angular.module('cookbook',['ngRoute','angularUtils.directives.dirDisqus']).controller('indexController',function($scope, $http)
	{
		$scope.currentTab={'name':'home'};

		$scope.tabClick=function(newTab)
		{
			$scope.currentTab.name=newTab;
		};
	});
angular.module('cookbook').config(['$locationProvider',function ($locationProvider)
	{

		// $locationProvider.html5Mode({enabled:true});
		$locationProvider.hashPrefix('!');

	}]);

var rootURL="http://127.0.0.1";   //save root url
var mainPort=":8080";
var solrPort=":8983";
var searchFragsize=200;


/*init part*/

//init cookie
(function()
{
	if(getCookie('totalNumber')==='')
	{
		setCookie('totalNumber',0,60);
		
		var array=[];
		var string=JSON.stringify(array);
		setCookie('cardCollection',string,60);
	}

	if(getCookie('recommend')==='')
	{
		var array1=[];
		var string1=JSON.stringify(array1);
		setCookie('recommend',string1,60);
	}
}());