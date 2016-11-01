angular.module('cookbook').controller('loginController',function($http,$scope,commonService)
{

	$scope.loginSubmit=function()
	{
		commonService.login($scope.username,$scope.password);
	};
});