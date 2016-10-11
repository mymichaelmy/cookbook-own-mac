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

		var config = {
			headers:{
				'Content-Type': 'application/json'
			},

			responseType:'text'
		};

		$http.post('http://127.0.0.1:8080/drupal/userapi/user/register.json',submitObj,config);
	};   //need to modify ip address before upload
});