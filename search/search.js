angular.module('cookbook').controller('searchController',function($scope,$location)
{
	this.searchTerm='default';
	this.searchSubmit=function()
	{
		console.log(this.searchTerm);
		$location.url('/:8080/search/'+this.searchTerm);
	};
});