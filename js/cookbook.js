angular.module('cookbook',['ngRoute','ngAnimate','angularUtils.directives.dirDisqus','angular-spinkit','naif.base64']).controller('indexController',function($scope, $http,$sce)
	{
		$scope.currentTab={'name':'home'};

		$scope.tabClick=function(newTab)
		{
			$scope.currentTab.name=newTab;
		};

		$scope.toTrustedHTML=function (html)   //this function is to trust the html that returned by solr
		{
			return $sce.trustAsHtml(html);
		};

		$scope.showPopup=getCookie('noPopup')?false:true;

		$scope.closePopup=function()
		{
			$scope.showPopup=false;

			setCookie('noPopup',true,200,'/');
		};
	});
angular.module('cookbook').config(['$locationProvider',function ($locationProvider)
	{

		// $locationProvider.html5Mode({enabled:true});
		$locationProvider.hashPrefix('!');

	}]);

var rootURL="http://172.18.0.22";   //save root url
var mainPort=":80";
var solrPort=":443";
var searchFragsize=200;
var numberPerPage=12;     //num of items on a serach page

/*init part*/

//init cookie
(function()
{
	if(getCookie('totalNumber')==='')
	{
		setCookie('totalNumber',0,60);
		
		var array=[];
		var string=JSON.stringify(array);
		setCookie('cardCollection',string,60);
	}

	if(getCookie('recommend')==='')
	{
		var array1=[];
		var string1=JSON.stringify(array1);
		setCookie('recommend',string1,60);
	}
}());


//for filter of facet
angular.module('cookbook').filter('noDash',function() {
    return function(input) {
		var result='';
        switch(input)
        {
			case 'method_card':
				result='Method';
				break;

			case 'class_tip':
				result='Classroom management';
				break;

			case 'course_example':
				result='Course';
				break;

			default:
				result='';
        }

        return result;
    };
});

angular.module('cookbook').filter('fileName',function() {
    return function(input) {
		var myRegexp = /^public:\/\/(.*)$/g;
		var match= myRegexp.exec(input);

		if(match)
		{
			return match[1];
		}
		
		
    };
});