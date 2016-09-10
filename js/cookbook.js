angular.module('cookbook',['ngRoute','angularUtils.directives.dirDisqus']).controller('indexController',function($scope, $http,$sce)
	{
		$scope.currentTab={'name':'home'};

		$scope.tabClick=function(newTab)
		{
			$scope.currentTab.name=newTab;
		};

		$scope.toTrustedHTML=function (html)   //this function is to trust the html that returned by solr
		{
			return $sce.trustAsHtml(html);
		};
	});
angular.module('cookbook').config(['$locationProvider',function ($locationProvider)
	{

		// $locationProvider.html5Mode({enabled:true});
		$locationProvider.hashPrefix('!');

	}]);

var rootURL="http://54.153.57.8";   //save root url
var mainPort=":80";
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