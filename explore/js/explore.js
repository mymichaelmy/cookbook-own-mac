angular.module('cookbook').controller('exploreController',  function($scope, $http)
{

	//init
	var url=$scope.currentUrl=rootURL+solrPort+"/solr/drupal/select?"+"wt=json&json.nl=arrarr&indent=true&hl=true&hl.fragsize="+searchFragsize+"&fq=ss_language:und&facet=on&facet.field=bundle";
	$scope.currentCategory="all";


	$http.get(url).success(function(data)
    {
		$scope.totalNumber=data.response.numFound;

        $scope.results=data.response.docs;
       
        $scope.categories=data.facet_counts.facet_fields.bundle;

        refreshPagers($scope.totalNumber);

        $scope.currentPage=1;
    });
	//init ends

	function refreshPagers(totalNumber)
	{
		$scope.pagers=[];
		for(var i=1;i<=(totalNumber-1)/10+1;i++)
		{
			$scope.pagers.push(i);
		}
	}

	//set category
	$scope.setCategory=function(category,numberInCategory)
    {
		if(category!=$scope.currentCategory)
		{
			$scope.currentCategory=category;
			// console.log($scope.currentCategory); for testing
			// 
			var url=$scope.currentUrl;

			if(category!=='all')
			{
				url+=("&fq=bundle:"+category);
			}

			else
			{
				numberInCategory=$scope.totalNumber;
			}

			$http.get(url).success(function(data)
			{
				

				$scope.results=data.response.docs;

				refreshPagers(numberInCategory);  //refresh pager on bottom
       
				$scope.currentPage=1;
			});
		}
	};
});