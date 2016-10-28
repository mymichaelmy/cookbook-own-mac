angular.module('cookbook').controller('resetPassController',function($http,$scope,$routeParams)
{
	$scope.resetPassword=function()
	{
		$scope.uid=$routeParams.uid;
		$scope.token=$routeParams.token;

		var configPost = {
				headers:{
					'Content-Type': 'application/json',
				},
			};
		var dataPost=
		{

		};
		$http.post('/drupal/userapi/user/token.json',dataPost,configPost).success(function(data)  //gain x-csrf token
		{
			console.log(data);

			var config = {
				headers:{
					'Content-Type': 'application/json',
					'X-CSRF-Token': data.token
				},
			};
			var passData=
			{
				"pass": $scope.password,
				"pass1": $scope.password,
				"pass2": $scope.password
            };

			$http.put('drupal/userapi/user/'+$scope.uid+'.json?pass-reset-token='+$scope.token,passData,config).success(function(data)
			{
				console.log(data);
			}).error(function(data, status)
			{
				console.error('error', status, data);
			});
		}).error(function(data, status)
		{
			console.error('error', status, data);
		});
			
		
	};

});