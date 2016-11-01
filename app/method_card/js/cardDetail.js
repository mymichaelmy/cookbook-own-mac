angular.module('cookbook').controller('cardDetailController',  function($scope, $http,$routeParams,commonService) {

  // $scope.order_id = $routeParams.orderId;
  // 
    function downloadTxt(txtString)
    {
            var blob = new Blob([txtString], {type: "text/plain;charset=utf-8"});

            var textFile = window.URL.createObjectURL(blob);

            return textFile;
    }
    $http.get('/drupal/rest/node/'+$routeParams.cardUid).success(function(data)
    {
        $scope.card=data;
        $scope.disIdentifier=data.type+data.nid;   //temperarily put here but it's hard to pass parameter before the next controller is loaded
        $scope.linkArray=$scope.card.field_links.und;

        $scope.addToCollection=function(cardType, cardID)
        {
            //should check if added
            if(cardIfAdded('cardCollection',cardType,cardID)===false)
            {
            
                var newCard={'cardType':cardType,'cardID':cardID};
                var currentNumber=Number(getCookie('totalNumber'))+1;
                var currentCollection=[];
                if(getCookie('cardCollection')!=='')
                {
                    currentCollection=JSON.parse(getCookie('cardCollection'));
                }
                   


                currentCollection.push(newCard);
                var collectionString=JSON.stringify(currentCollection);
                // console.log(currentNumber);
                // console.log(currentCollection);
                setCookie('totalNumber',currentNumber,60,'/');
                setCookie('cardCollection',collectionString,60,'/');

            // setCookie(totalNumber,document.cookie,10,'/');
            }
        };


        $scope.recommendCard=function(cardType,cardID,currentNumber)
        {
            //check cookie
            //
            //
            if(cardIfAdded('recommend',cardType, cardID)===false)
            {
                var array=[{value:parseInt(currentNumber,10)+1}];
                var field_recommended={
                    und:array
                };
                var data={
                    "field_recommended": field_recommended
                };

                console.log(data);
                
                $http.put('/drupal/rest/node/'+cardID,data).success(function(data)
                {
                    $scope.card.field_recommended.und[0].value++;
                    var newCard={'cardType':cardType,'cardID':cardID};
                    var currentCollection=JSON.parse(getCookie('recommend'));

                    currentCollection.push(newCard);
                    var collectionString=JSON.stringify(currentCollection);
                    setCookie('recommend',collectionString,60,'/');
                });
            }
        };

        var txtString="";

        txtString+="\\b "+$scope.card.title+" \\b0\\par ";
        txtString+=$scope.card.field_summary.und[0].value+"\\par ";

        if($scope.card.field_arsenal_files.und)
        {
            txtString+="\\par \\b "+"Resources"+" \\b0\\par ";
            $scope.card.field_arsenal_files.und.forEach(function(value,index)
            {

                txtString+=(index+1)+". "+value.filename+"\\par ";
                txtString+=linkToRtf(value.uri,true);
            });
        }

        if($scope.card.field_links.und)
        {
            txtString+="\\par \\b "+"Also see"+" \\b0\\par ";
            $scope.card.field_links.und.forEach(function(value,index)
            {

                txtString+=(index+1)+". "+value.title+"\\par ";
                txtString+=linkToRtf(value.url,false);
            });
        }

        // txtString+="<br />"+"Steps"+"<br />";
        // $scope.card.field_recipe_steps_text.und.forEach(function(value,index)
        // {

        //     txtString+=(index+1)+". "+value.value+"<br />";
        // });
        
        // var downloadLink=document.getElementById('downloadTxt');
        // downloadLink.href=downloadTxt(txtString);


        txtString=encodeURIComponent(txtString);
        $scope.downloadDoc=function()
        {
            window.location.href = "/php/rtf.php"+"?content="+txtString+"&title="+$scope.card.title;
        };


        $scope.contributeLink=function()
        {
            if(validateLink($scope.form.link))
            {
                var linkObject=
                {
                    'url':$scope.form.link,
                    'title':$scope.form.title
                };

                $scope.linkArray.push(linkObject);
                var field_links={ und:$scope.linkArray };

                var data={ 'field_links':field_links };
                
                if(!commonService.CSRFToken)
                {
                    commonService.getCSRF(commonService.updateContributeLinks,data,$routeParams.cardUid);
                }
                else
                {
                    commonService.updateContributeLinks(data,$routeParams.cardUid);
                }

            }

            else
            {
                console.error('link not working!');
            }
        };
        
    });
});


//check if card added
function cardIfAdded(cookieName,cardType, cardID)
{
    var cardArray=[];
    if(getCookie(cookieName)!=='')
    {
        cardArray=JSON.parse(getCookie(cookieName));
    }
    

    for(var i=0;i<cardArray.length;i++)
    {
        if(cardArray[i].cardID===cardID)
        {
            return true;
        }

    }
    

    return false;
}
