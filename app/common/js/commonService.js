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

		commonService.updateContributeLinks=function(data,uid,scope,formID,index) //data: data to be sent, uid:uid of the card, scope:$scope, formID: id of the contribute form to reset the form, index: index of the item to be removed -1 if intend to update a link
		{
			var config = {
				headers:{
					'Content-Type': 'application/json',
					'X-CSRF-Token': commonService.CSRFToken
				},
			};

			$http.put('/drupal/rest/node/'+uid,data,config).success(function(responseData)
            {
				if(index===-1)   //judge if it's for remove
				{
					scope.card.field_links=data.field_links;
				}

				else
				{
					scope.card.field_links.und.splice(index,1);
				}

                

                if(formID!=='')
                {
					document.getElementById(formID).reset();   //reset the form, clean the buffer
                }
                

            }).error(function(data){
                console.error(data);
            });
		};

		commonService.getFileLink=function(link,scope)//get link
		{
			responseObj=JSON.parse(link);
			$http.get(responseObj.uri).then(function(response)
			{
				scope.form.link=response.data.uri_full;
			}).catch(function(response)
			{
				console.error('error', response.statusText);
			});
	
		};

		commonService.startUploadFile=function(filename,filedata,subfolder,scope)
		{
			//check CSRF
			if(!commonService.CSRFToken)
			{
				commonService.getCSRF(commonService.processUploadXHR,filename,filedata,subfolder,scope);
			}

			else
			{
				commonService.processUploadXHR(filename,filedata,subfolder,scope);
			}

		};

		commonService.processUpload=function(filename,filedata,subfolder,scope)
		{
			var config = {
				headers:{
					'Content-Type': 'application/json',
					'X-CSRF-Token': commonService.CSRFToken
				},
			};

			var submitObj=
			{
				file:
				{
					filename:filename,
					file:filedata,
					filepath:'public://'+subfolder+'/'+filename
				}
				
			};

			$http.post('/drupal/rest/file',submitObj,config).then(function(response)   //need to modify ip address before upload
			{
			//login or email verification
				console.log(response);
				scope.form.link=filename;
			}).catch(function(response)
			{
				console.error('error', response.statusText);
			});


		};

		commonService.processUploadXHR=function(filename,filedata,subfolder,scope)
		{
			var xhr=new XMLHttpRequest();
			xhr.open('POST','/drupal/rest/file');
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader('X-CSRF-Token', commonService.CSRFToken);


			var submitObj=
			{
				file:
				{
					filename:filename,
					file:filedata,
					filepath:'public://'+subfolder+'/'+filename
				}
			};

			xhr.addEventListener("load", uploadComplete, false);
			xhr.addEventListener("error", uploadFailed, false);
			xhr.upload.addEventListener("progress", uploadProgress, false);
			xhr.send(JSON.stringify(submitObj));

			function uploadComplete(evt)
			{
				function hideProgressBar()
				{
					scope.barShow=false;
				}

				if(xhr.status==200)
				{
					
					scope.$apply(function(){
						commonService.getFileLink(xhr.responseText,scope);
						scope.form.title=filename;
						
					});
				}
				
			}

			function uploadFailed(evt)
			{
				console.error(evt); //should add code here to let users know it failes
			}

			function uploadProgress(evt)
			{
				if(evt.lengthComputable)
				{
					scope.progress=evt.loaded * 100 / evt.total;
					console.log(evt.loaded * 100 / evt.total+'%');
				}
				else
				{
					scope.progress=0;
					console.log("Progress not computable");
				}
			}

		};

		return commonService;
	}]);
}());