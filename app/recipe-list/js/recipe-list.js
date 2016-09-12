angular.module('cookbook').controller('recipeListController',function($scope,$http)
{
	$http.get(rootURL+mainPort+'/drupal/content/link-list-recipes').success(function(data)
	{
		$scope.nodes=(function()
        {
        
            return data.nodes;

        }());
	});

});