angular.module('cookbook').controller('collectionController',function($scope,$http)
{
	var collectionArray=JSON.parse(getCookie('cardCollection'));
	var outputArray=[]; //prepare output for cards
	$scope.selectArray=[]; //array for select box

	collectionArray.forEach(function(value,index)
	{
		
		$http.get('/drupal/rest/node/'+value.cardID).success(function(data)
		{
			//set up the card obj and push it into the array used in ng-repeat
			var obj=
			{
				title:data.title,
				imgSrc:"/drupal/sites/default/files/"+data.field_card_image.und[0].filename,
				summary:data.field_activity_description.und[0].value,
				category:data.type,
				nid:data.nid,
				zipName:data.field_zip_files.und[0].filename,
				fileURL:rootURL+mainPort+"/drupal/sites/default/files/"+data.field_zip_files.und[0].filename,
				indexInCookie:index
			};

			if(data.field_author)
			{
				obj.author=data.field_author.und[0].value;
			}
			else
			{
				obj.author='anonymous';
			}
			if(data.field_recommended.und)
			{
				obj.recommended=data.field_recommended.und[0].value;
			}
			else
			{
				obj.recommended=0;
			}
			if(data.field_endorse.und)
			{
				obj.endorse=data.field_endorse.und[0].value;
			}
			else
			{
				obj.endorse='';
			}

			outputArray.push(obj);
			$scope.selectArray.push(false);

		});
	});



	$scope.cards=outputArray;


	$scope.toggleAll=function(selectAll)
	{
		var i=0;
		if(selectAll)
		{
			for(i=0;i<$scope.selectArray.length;i++)
			{
				$scope.selectArray[i]=true;
			}
		}
		else
		{
			for(i=0;i<$scope.selectArray.length;i++)
			{
				$scope.selectArray[i]=false;
			}
		}
	};
});