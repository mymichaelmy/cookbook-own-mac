angular.module('cookbook').directive('cardOnHomepage',function()
{
	return {
		restrict: 'E',
		scope:
		{
			categoryurl:'@',
			category:'@',
			title:'@'

		},
		templateUrl: '/app/index/templates/index-card-template.html',
		controller: 'homeCardsController'
	};
});


angular.module('cookbook').controller('homeCardsController',function($http,$scope)
{
	//reset title to cookbook
	document.title = cookbookTitle;
	
	$http.get('/drupal/content/'+$scope.categoryurl).success(function(data)
    {
        $scope.cards=(function()
        {

            return data.nodes;

        }());

        $scope.haveContent=(data.nodes&&data.nodes.length);
    });


});

angular.module('cookbook').controller('homeController',function($scope)
{
	$scope.scrollDown=function(id)
    {
		var target=document.getElementById(id);
		window.scrollTo(0,window.scrollY+target.getBoundingClientRect().top);
    };
});
