angular.module('cookbook').controller('cardDetailController',  function($scope, $http,$routeParams,commonService) {

  // $scope.order_id = $routeParams.orderId;
  // 
    function downloadTxt(txtString)
    {
            var blob = new Blob([txtString], {type: "text/plain;charset=utf-8"});

            var textFile = window.URL.createObjectURL(blob);

            return textFile;
    }

    //init form hide
    $scope.form={};
    $scope.contributeForm={};
    $scope.contributeForm.hide=true;


    $http.get('/drupal/rest/node/'+$routeParams.cardUid).success(function(data)
    {
        $scope.card=data;
        $scope.disIdentifier=data.type+data.nid;   //temperarily put here but it's hard to pass parameter before the next controller is loaded
        // $scope.linkArray=$scope.card.field_links.und;

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


        $scope.contributeLink=function(form)
        {
            if(validateLink(form.link))
            {
                var attributeObj=
                {
                    title:form.name,
                    'class':''
                };
                var linkObject=
                {
                    'url':form.link,
                    'title':form.title,
                    'attributes':attributeObj
                };

                var duplicateObj=JSON.parse(JSON.stringify($scope.card.field_links));

                duplicateObj.und.push(linkObject);
                var data={ 'field_links':duplicateObj };
                
                if(!commonService.CSRFToken)
                {
                    commonService.getCSRF(commonService.updateContributeLinks,data,$routeParams.cardUid,$scope,'contribute-form',-1);
                }
                else
                {
                    commonService.updateContributeLinks(data,$routeParams.cardUid,$scope,'contribute-form',-1);
                }

            }

            else
            {
                console.error('link not working!');
            }
        };

        $scope.form={};
        $scope.contributeForm={};
        $scope.contributeForm.hide=true;  //false is closed
        

        $scope.removeLink=function(index)
        {

            var duplicateObj=JSON.parse(JSON.stringify($scope.card.field_links));
            duplicateObj.und.splice(index,1);
            var emptyObj={
                'url':'',
                'title':'',
                'attributes':
                {
                    'title':'',
                    'class':''
                }
            };

            duplicateObj.und.push(emptyObj);

            var data={ 'field_links':duplicateObj };

            if(!commonService.CSRFToken)
            {
                commonService.getCSRF(commonService.updateContributeLinks,data,$routeParams.cardUid,$scope,'contribute-form',index);
            }
            else
            {
                commonService.updateContributeLinks(data,$routeParams.cardUid,$scope,'contribute-form',index);
            }
        };

        
        
    });

    
});

angular.module('cookbook').controller('singleLinkController',  function($scope, $http,$routeParams,commonService) {

    $scope.editShow=false;
    $scope.toggleShowEdit=function(index)
    {
        $scope.editShow=!$scope.editShow;
    };

});

angular.module('cookbook').directive('editForm',function($routeParams,commonService)
{
    return {
        restrict:'E',
        template: '<form ng-show="editShow"><div class="link-left"><input type="text" name="title" placeholder="{{link.title}}" required value="{{link.title}}"><br /><input type="text" name="link" placeholder="{{link.url}}"required value="{{link.url}}"><br /><input type="text" name="name" placeholder="{{link.attributes.title}}" required value="{{link.attributes.title}}"></div><button type="button" class="edit-button" ng-click="updateLink($index)">Submit</button><button type="button" class="remove-button" ng-click="toggleShowEdit($index)">Cancel</button></form>',
        replace:true,
        link:
        function(scope, element, attrs)
        {
            scope.updateLink=function(index)
            {
                console.log(element[0].elements['link'].value);
                console.log(scope.card);

                var duplicateObj=JSON.parse(JSON.stringify(scope.card.field_links));

                var updatedObj={
                    'url':element[0].elements['link'].value,
                    'title':element[0].elements['title'].value,
                    'attributes':
                    {
                        'title':element[0].elements['name'].value,
                        'class':''
                    }
                };

                duplicateObj.und.splice(index,1,updatedObj);

                var data={ 'field_links':duplicateObj };

                if(!commonService.CSRFToken)
                {
                    commonService.getCSRF(commonService.updateContributeLinks,data,$routeParams.cardUid,scope,'',-1);
                }
                else
                {
                    commonService.updateContributeLinks(data,$routeParams.cardUid,scope,'',-1);
                }
            };

            
        }
       
    };
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
