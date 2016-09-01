angular.module('cookbook').controller('exploreController',  function($scope, $http,$routeParams)
{

	//init
	$scope.currentTab.name='explore';//change the tab

	var url=$scope.currentUrl=rootURL+solrPort+"/solr/drupal/select?"+"wt=json&json.nl=arrarr&indent=true&hl=true&hl.fragsize="+searchFragsize+"&fq=ss_language:und&facet=on&facet.field=bundle&facet.field=sm_field_author&facet.field=sm_field_endorse";
	$scope.currentCategory="all";

	$scope.filterStatus={};

	//check if there are existing category
	if($routeParams.category)
	{
		$scope.currentCategory=$routeParams.category;
		$scope.currentUrl+=('&fq=bundle:'+$scope.currentCategory);
	}

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

				// $scope.highlighting=data.highlighting;

				$scope.currentPage=num;
       
			});

		}
    };


	//set category
	$scope.setCategory=function(categoryTitle,categoryValue,numberInCategory)
    {
		if((categoryValue!=$scope.currentCategory)||($scope.filterStatus[categoryTitle]!=categoryValue))
			{
				$scope.currentCategory=categoryValue;
				// console.log($scope.currentCategory); for testing
				// 
				// 
				//need modify the currentUrl which is different from search.js
				
				
				//format the name of professors
				var stringWithSlash=replaceSpaceForSolr(categoryValue);
				
				var regObj=new RegExp('&fq='+categoryTitle+'(.*?)(&|$)','g');
				$scope.currentUrl=$scope.currentUrl.replace(regObj,'');
				$scope.currentUrl=$scope.currentUrl.replace('&fq=bundle','');

				if(categoryValue!=='all')
				{
					$scope.currentUrl+=('&fq='+categoryTitle+':'+stringWithSlash);
				}


				$http.get($scope.currentUrl).success(function(data)
				{
					

					//update filter status
					$scope.filterStatus[categoryTitle]=categoryValue;
					//
					$scope.results=data.response.docs;

					if(categoryTitle!='bundle')
					{
						//update the bundle tab
						$scope.totalNumber=data.response.numFound;
						$scope.categories=data.facet_counts.facet_fields.bundle;
						$scope.currentCategory='all';
					}
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