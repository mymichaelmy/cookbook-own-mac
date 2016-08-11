angular.module('cookbook').controller('cardDetailController',  function($scope, $http,$routeParams) {

  // $scope.order_id = $routeParams.orderId;
    $http.get('/drupal/rest/node/'+$routeParams.cardUid).success(function(data)
    {
        $scope.card=data;
        $scope.disIdentifier=data.type+data.nid;   //temperarily put here but it's hard to pass parameter before the next controller is loaded

        $scope.addToCollection=function(cardType, cardID)
        {
            //should check if added
            if(cardIfAdded(cardType,cardID)===false)
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


        $scope.recommendCard=function(cardType,cardId,currentNumber)
        {
            //check cookie
            //
            //
            
            var array=[{value:parseInt(currentNumber,10)+1}];
            var field_recommended={
                und:array
            };
            var data={
                "field_recommended": field_recommended
            };

            console.log(data);
            
            $http.put('/drupal/rest/node/'+cardId,data).success(function(data)
            {
                console.log("success");
            });
        };
        
    });
});