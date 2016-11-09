angular.module('cookbook').directive('signUp', function() {
	return {

		restrict: 'E',
		// replace:'true',
		templateUrl:'/app/shared/signup/signupDirective.html',
		link:function(scope,elem,attr)
		{

		},
		controller:function($scope)
		{
			$scope.signUpShow=false;
			$scope.passwordMatch=function()
			{
				if($scope.password!=$scope.password2)
				{
					return false;
				}
				else
				{
					return true;
				}
			};
		}
	};

});