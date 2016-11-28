angular.module('cookbook').directive('contributeForm',function($http,commonService)
{
	return {
		restrict:'E',
        templateUrl:'/app/shared/contribute-form/contributeFormDirective.html',
        replace:true,
        link:function(scope,element,attrs)
        {
			scope.form={};
			scope.contributeForm={};
			scope.contributeForm.hide=true;
			scope.barOpacity=0.8;   //opacity of the bar

			scope.contributeButton=function(status)
			{
				if(!status.hide)
				{
					scope.contributeLink(scope.form);
					status.hide=true;
				}

				else
				{
					status.hide=false;
				}
			};

			scope.quitContributeButton=function()
			{
				scope.contributeForm.hide=true;
			};

			scope.onAfterValidateFunc=function()
			{
				commonService.startUploadFile(scope.form.file.filename,scope.form.file.base64,'alsoSee',scope);
			};
		}
	};



});