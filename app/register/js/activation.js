angular.module('cookbook').controller('activationController',function($http,$scope,$routeParams)
{

		$scope.uid=$routeParams.uid;
		var submitObj=
		{
			uid:$routeParams.uid,
			timestamp:$routeParams.timestamp,
			hashed_pass:$routeParams.hashed_pass,
			
		};

		var config = {
			headers:{
				'Content-Type': 'application/json'
			},
		};

		$http.post('drupal/userapi/user/user_pass_reset.json',submitObj,config).success(function(data)   //need to modify ip address before upload
		{
			console.log(data);
			$scope.token=data.pass_reset_token;
			// var passData=
			// {
			// 	"pass": $scope.password,
			// 	"pass1": $scope.password,
			// 	"pass2": $scope.password
   //          };

			// $http.put('drupal/userapi/user/'+$scope.uid+'.json?pass-reset-token='+data.pass_reset_token,passData).success(function(data)
			// {
			// 	console.log(data);
			// }).error(function(data, status)
			// {
			// 	console.error('error', status, data);
			// });
		});


});