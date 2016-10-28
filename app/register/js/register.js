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
			$http.post('/drupal/userapi/user/register.json',submitObj,config).success(function(data)   //need to modify ip address before upload
			{
			//login or email verification
				console.log(data);
			});
		});
		
	};
});