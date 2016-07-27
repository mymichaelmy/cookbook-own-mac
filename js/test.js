var test=angular.module('test',['ngRoute']);

test.controller('testController',function($scope, $http)
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

test.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/notes', {
			templateUrl: 'templates/index-template.html',
			controller: 'ShowOrderController'
      })
      .when('/', {
			templateUrl: 'templates/index-template.html',
			controller: 'ShowOrderController'
      })
      .otherwise({
            redirectTo: "/"
      });

  }]);

test.controller('ShowOrderController', function($scope, $routeParams) {

	$scope.order_id = $routeParams.orderId;

});