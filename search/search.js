
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

    var url=rootURL+solrPort+"/solr/drupal/select?q="+$routeParams.searchTerm+"&wt=json&json.nl=arrarr&indent=true&hl=true&hl.fragsize="+searchFragsize+"&fq=ss_language:und&facet=on&facet.field=bundle";
		//ss_language used to remove duplicated results
		//json.nl is for a proper format for json for facet
		//
	$scope.currentUrl=rootURL+solrPort+"/solr/drupal/select?q="+$routeParams.searchTerm+"&wt=json&json.nl=arrarr&indent=true&hl=true&hl.fragsize="+searchFragsize+"&fq=ss_language:und&facet=on&facet.field=bundle";
	//function to refresh pagers every time
	function refreshPagers(totalNumber)
	{
		$scope.pagers=[];
		for(var i=1;i<=(totalNumber-1)/10+1;i++)
		{
			$scope.pagers.push(i);
		}
	}

	//function to init search result
    $http.get(url).success(function(data)
    {
		$scope.totalNumber=data.response.numFound;

        $scope.results=data.response.docs;


        $scope.highlighting=data.highlighting;

       
        $scope.categories=data.facet_counts.facet_fields.bundle;

        refreshPagers($scope.totalNumber);

        $scope.currentPage=1;
    });

    
    //function to go to a certain page
    $scope.goToPage=function(num)
    {
		if($scope.currentPage!==num)
		{
			var url=$scope.currentUrl;


			if($scope.currentCategory!=='all')
			{
				url+=('&fq=bundle:'+$scope.currentCategory);
			}

			url+=('&start='+(num-1)*10);

			$http.get(url).success(function(data)
			{
				

				$scope.results=data.response.docs;

				$scope.highlighting=data.highlighting;

				$scope.currentPage=num;
       
			});

		}
    };

    

    $scope.toTrustedHTML=function (html)   //this function is to trust the html that returned by solr
    {
        return $sce.trustAsHtml(html);
    };

    $scope.currentCategory="all";
    //function to set category
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

				$scope.highlighting=data.highlighting;

				refreshPagers(numberInCategory);  //refresh pager on bottom
       
				$scope.currentPage=1;
			});
		}
	};

	$scope.submitFilter=function()
	{
		var addString='';
		if($scope.filter.sm_field_author)
		{
			addString=toTitleCase($scope.filter.sm_field_author);
			addString=replaceSpaceForSolr(addString);
			$scope.currentUrl+='&fq=sm_field_author:'+addString;
		}
		if($scope.filter.sm_field_endorse)
		{
			addString=toTitleCase($scope.filter.sm_field_endorse);
			addString=replaceSpaceForSolr(addString);
			$scope.currentUrl+='&fq=sm_field_endorse:'+addString;
		}

		$http.get($scope.currentUrl).success(function(data)
		{
				
			$scope.totalNumber=data.response.numFound;
			$scope.results=data.response.docs;

			$scope.highlighting=data.highlighting;

			refreshPagers($scope.totalNumber);  //refresh pager on bottom
   
			$scope.currentPage=1;
		});


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

