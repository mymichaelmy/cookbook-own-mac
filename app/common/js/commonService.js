(function(){
	angular.module('cookbook').factory('commonService',['$http',function($http)
	{
		var commonService={};

		commonService.CSRFToken='';

		//getCSRF
		commonService.getCSRF=function(successCallback)
		{
			var dataPost={};
			var config =
			{
				headers:
				{
					'Content-Type': 'application/json'
				},
			};

			var argArray=Array.prototype.slice.call(arguments, 1);  //remove the first parameter and pass all the arguments to callback function
			$http.post('/drupal/userapi/user/token.json',dataPost,config).success(function(data)  //gain x-csrf token
			{
				commonService.CSRFToken=data.token;
				successCallback.apply(this,argArray);   //pass arguments to callback function
			}).error(function(data, status)
			{
				console.error('error', status, data);
			});
		};


		//login function
		commonService.login=function(username,password)
		{
			//check CSRF
			if(!commonService.CSRFToken)
			{
				commonService.getCSRF(commonService.loginPost,username,password);
			}

			else
			{
				commonService.loginPost(username,password);
			}
		};

		//login post function
		commonService.loginPost=function(username,password)
		{
			var config = {
				headers:{
					'Content-Type': 'application/json',
					'X-CSRF-Token': commonService.CSRFToken
				},
			};

			var submitObj=
			{
				'username':username,
				'password':password
			};

			$http.post('/drupal/userapi/user/login.json',submitObj,config).then(function(response)   //need to modify ip address before upload
			{
			//login or email verification
				console.log(response);
			}).catch(function(response)
			{
				console.error('error', response.statusText);
			});

		};

		commonService.updateContributeLinks=function(data,uid)
		{
			var config = {
				headers:{
					'Content-Type': 'application/json',
					'X-CSRF-Token': commonService.CSRFToken
				},
			};

			$http.put('/drupal/rest/node/'+uid,data,config).success(function(data)
            {
                console.log(data);

            }).error(function(data){
                console.error(data);
            });
		};

		return commonService;
	}]);
}());