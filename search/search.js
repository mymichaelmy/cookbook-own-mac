
//search field controller
angular.module('cookbook').controller('searchController',function($scope,$location)
{
	this.searchTerm='';
	this.searchSubmit=function()
	{
		// console.log(this.searchTerm);    only for test
		$location.url('/search/'+this.searchTerm);
	};
});




//search resutl controller
angular.module('cookbook').controller('searchResultController',  function($scope, $http,$routeParams,$sce) {

    var url=rootURL+":8983/solr/drupal/select?q="+$routeParams.searchTerm+"&wt=json&json.nl=arrarr&indent=true&hl=true&hl.fragsize="+searchFragsize+"&fq=ss_language:und&facet=on&facet.field=bundle";
		//ss_language used to remove duplicated results
		//json.nl is for a proper format for json for facet
    $http.get(url).success(function(data)
    {
		$scope.totalNumber=data.response.numFound;

        $scope.results=data.response.docs;


        $scope.highlighting=data.highlighting;

       
        $scope.categories=data.facet_counts.facet_fields.bundle;
    });

    $scope.currentCategory="all";

    $scope.toTrustedHTML=function (html)   //this function is to trust the html that returned by solr
    {
        return $sce.trustAsHtml(html);
    };

    $scope.setCategory=function(category)
    {
		if(category!=$scope.currentCategory)
		{
			$scope.currentCategory=category;
			// console.log($scope.currentCategory); for testing
		}
	};
});




//for filter of facet
angular.module('cookbook').filter('noDash',function() {
    return function(input) {
        if (input) {
			return input.replace('_', ' ');
        }
    };
});