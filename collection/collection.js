angular.module('cookbook').controller('collectionController',function($scope,$http)
{
	var collectionArray=JSON.parse(getCookie('cardCollection'));
	var outputArray=[];
	collectionArray.forEach(function(value,index)
	{
		
		$http.get('/drupal/rest/node/'+value.cardID).success(function(data)
		{
			var obj=
			{
				title:data.title,
				imgSrc:"/drupal/sites/default/files/"+data.field_card_image.und[0].filename,
				summary:data.field_activity_description.und[0].value,
				nid:data.nid,
				zipName:data.field_zip_files.und[0].filename,
				fileURL:rootURL+mainPort+"/drupal/sites/default/files/"+data.field_zip_files.und[0].filename
			};

			outputArray.push(obj);

		});
	});



	$scope.cards=outputArray;
});