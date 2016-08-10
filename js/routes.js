

angular.module('cookbook')
.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/notes', {
            templateUrl: '/templates/index-template.html',
            controller: 'cardsController'
        })
        .when('/', {
            templateUrl: '/templates/index-template.html',
            controller: 'cardsController'
        })
        .when('/method_card/:cardUid', {
            templateUrl: '/templates/methods-template.html',
            controller: 'cardDetailController'
        })
        .when('/search/:searchTerm', {
            templateUrl: '/search/search-template.html',
            controller: 'searchResultController'
        })
        .when('/collection',{
            templateUrl:'/collection/collection-template.html',
            controller:'collectionController'
        })
        .otherwise({
            redirectTo: "/"
        });

}]);

angular.module('cookbook').controller('cardsController',  function($scope, $http) {

  // $scope.order_id = $routeParams.orderId;
    $http.get('/drupal/content/method-cards-homepage').success(function(data)
    {
        $scope.methods=(function()
        {
        
            return data.nodes;

        }());
    });

    $http.get('/drupal/content/class-tips-homepage').success(function(data)
    {
        $scope.tips=(function()
        {
        
            return data.nodes;

        }());
    });

    $http.get('/drupal/content/course-examples-homepage').success(function(data)
    {
        $scope.examples=(function()
        {
        
            return data.nodes;

        }());
    });
});

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
        
    });
});


