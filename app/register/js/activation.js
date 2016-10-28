angular.module('cookbook').controller('activationController',function($http,$scope,$routeParams)
{

		$scope.uid=$routeParams.uid;
		var submitObj=
		{
			uid:$routeParams.uid,
			timestamp:$routeParams.timestamp,
			hashed_pass:$routeParams.hashed_pass,
			
		};

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
			$http.post('drupal/userapi/user/user_pass_reset.json',submitObj,config).success(function(data)   //need to modify ip address before upload
			{
				console.log(data);
				$scope.token=data.pass_reset_token;
			});
		});


});