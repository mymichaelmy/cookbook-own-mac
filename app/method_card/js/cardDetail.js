angular.module('cookbook').controller('cardDetailController',  function($scope, $http,$routeParams) {

  // $scope.order_id = $routeParams.orderId;
    $http.get('/drupal/rest/node/'+$routeParams.cardUid).success(function(data)
    {
        $scope.card=data;
        $scope.disIdentifier=data.type+data.nid;   //temperarily put here but it's hard to pass parameter before the next controller is loaded

        $scope.addToCollection=function(cardType, cardID)
        {
            //should check if added
            if(cardIfAdded('cardCollection',cardType,cardID)===false)
            {
            //
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