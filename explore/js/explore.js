angular.module('cookbook').controller('exploreController',  function($scope, $http)
{

	//init
	var url=$scope.currentUrl=rootURL+solrPort+"/solr/drupal/select?"+"wt=json&json.nl=arrarr&indent=true&hl=true&hl.fragsize="+searchFragsize+"&fq=ss_language:und&facet=on&facet.field=bundle&facet.field=sm_field_author&facet.field=sm_field_endorse";
	$scope.currentCategory="all";


	$http.get(url).success(function(data)
    {
		$scope.totalNumber=data.response.numFound;

        $scope.results=data.response.docs;
       
        $scope.categories=data.facet_counts.facet_fields.bundle;

        $scope.professors=data.facet_counts.facet_fields.sm_field_author;
        $scope.endorsements=data.facet_counts.facet_fields.sm_field_endorse;

        refreshPagers($scope.totalNumber);

        $scope.currentPage=1;
    });
	//init ends

	//uitility functions
	function refreshPagers(totalNumber)
	{
		$scope.pagers=[];
		for(var i=1;i<=(totalNumber-1)/10+1;i++)
		{
			$scope.pagers.push(i);
		}
	}


	$scope.goToPage=function(num)
    {
		if($scope.currentPage!==num)
		{
			var url=$scope.currentUrl;
			//don't need to store status of page, so don't modify currentUrl

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



	$scope.sort='';
	$scope.sortResult=function()
	{
		
		$scope.currentUrl=$scope.currentUrl.replace(/&sort.*desc/g,'');
		if($scope.sort)
		{
			$scope.currentUrl=$scope.currentUrl+'&sort='+$scope.sort+'%20desc';
		}
		

		$http.get($scope.currentUrl).success(function(data)
		{
			$scope.results=data.response.docs;
			$scope.highlighting=data.highlighting;
			$scope.currentPage=1;
		});
	};
});