angular.module('cookbook').controller('tipDetailController',  function($scope, $http,$routeParams,$location,$anchorScroll) {

  // $scope.order_id = $routeParams.orderId;
    $http.get('/drupal/rest/node/'+$routeParams.cardUid).success(function(data)
    {
        $scope.card=data;
        $scope.disIdentifier=data.type+data.nid;   //temperarily put here but it's hard to pass parameter before the next controller is loaded

        //change page title for printing
        document.title = 'Cookbook: '+data.title;
        
        $scope.addToCollection=function(cardType, cardID)
        {
            //should check if added
            if(cardIfAdded('cardCollection',cardType,cardID)===false)
            {
            //
                var newCard={'cardType':cardType,'cardID':cardID};
                var currentNumber=Number(getCookie('totalNumber'))+1;
                var currentCollection=JSON.parse(getCookie('cardCollection'));


                currentCollection.push(newCard);
                var collectionString=JSON.stringify(currentCollection);
                console.log(currentNumber);
                console.log(currentCollection);
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

        // $scope.scrollTo=function(id)
        // {
        //      $location.hash(id);
        //      $anchorScroll();
        // };
        // 
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


        txtString=encodeURIComponent(txtString);
        $scope.downloadDoc=function()
        {
            window.location.href = "/php/doc.php"+"?content="+txtString+"&title="+$scope.card.title;
        };
        
    });
});



angular.module('cookbook').directive('scrollOnClick', function($document) {
  return {
    restrict: 'A',
    link: function(scope, element,attr)
    {
        var target = document.getElementById(attr.scrollOnClick);
        element.on('click', function() {
        // $document.find('body').animate({scrollTop: target.getBoundingClientRect().top}, "slow");
        window.scrollTo(0,window.scrollY+target.getBoundingClientRect().top-200);
        //160 is the total height of
      });
    }
  };
});