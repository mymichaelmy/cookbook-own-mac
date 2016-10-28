angular.module('cookbook').controller('registerController',function($http,$scope)
{
	$scope.registerSubmit=function()
	{
		console.log('submit!');

		var submitObj=
		{
			name:$scope.username,
			pass:$scope.password,
			mail:$scope.email,
			status:"1",
			"profile_main":{
 
				"field_author_title":
				{
					"und": [{
					"value": $scope.title
					}]
				},
				"field_author_university":
				{
					"und": [{
					"value": $scope.university
					}]
				}
			}
		};

		var dataPost={};
		var config = {
			headers:{
				'Content-Type': 'application/json'
			},

			// responseType:'text'
		};

		$http.post('/drupal/userapi/user/token.json',dataPost,config).success(function(data)  //gain x-csrf token
		{
			var config = {
				headers:{
					'Content-Type': 'application/json',
					'X-CSRF-Token': data.token
				},
			};
			$http.post('/drupal/userapi/user/register.json',submitObj,config).then(function(response)   //need to modify ip address before upload
			{
			//login or email verification
				console.log(response);
			}).catch(function(response)
			{
				console.error('error', response);
			});
		}).error(function(data, status)
		{
			console.error('error', status, data);
		});
		
	};
});