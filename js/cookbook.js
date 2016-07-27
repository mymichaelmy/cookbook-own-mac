angular.module('cookbook',['ngRoute']).controller('testController',function($scope, $http)
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

