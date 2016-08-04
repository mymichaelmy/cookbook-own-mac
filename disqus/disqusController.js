(function() {
    
	
	angular.module('cookbook').controller('DisqusController', function($scope,$attrs) {

		var myRegexp = /\/([a-zA-Z_]+)\/(\d+)$/g;  //capture type and node number


		var arrayOfId = myRegexp.exec(window.location.href);
		var stringOfID = arrayOfId[1]+arrayOfId[2];

		$scope.disqusConfig = {
			disqus_shortname: 'cookbook-2',
			disqus_identifier: stringOfID,
			disqus_url: window.location.href
		};

		
		
		
	});
	
		
}());