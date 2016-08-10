angular.module('cookbook').directive('cardOnHomepage',function()
{
	return {
		restrict: 'E',
		scope:
		{
			category:'@',
			title:'@'

		},
		templateUrl: '/index-template/index-card-template.html',
		controller: 'homeCardsController'
	};
});


angular.module('cookbook').controller('homeCardsController',function($http,$scope)
{
	$http.get('/drupal/content/'+$scope.category).success(function(data)
    {
        $scope.cards=(function()
        {
        
            return data.nodes;

        }());
    });
});
