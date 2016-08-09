angular.module('cookbook',['ngRoute','angularUtils.directives.dirDisqus']).controller('testController',function($scope, $http)
	{
		$scope.foobar='angular loaded';
		$http.get('/drupal/json/recipes').success(function(data)  //should make sure the path is correct before migration
		{

			
			$scope.recipes = (function()
			{
			
				return data.nodes;

			}());

			// {
			//return data.notes;
			// })();
		});
	});
angular.module('cookbook').config(['$locationProvider',function ($locationProvider)
	{

		// $locationProvider.html5Mode({enabled:true});
		$locationProvider.hashPrefix('!');

	}]);

var rootURL="http://127.0.0.1:8080";   //save root url
var searchFragsize=200;


/*init part*/

//init cookie
(function()
{
	if(getCookie('totalNumber')==="")
	{
		setCookie('totalNumber',0,60);
		
		var array=[];
		var string=JSON.stringify(array);
		setCookie('cardCollection',string,60);
	}
}());