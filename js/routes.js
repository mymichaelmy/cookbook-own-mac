angular.module('cookbook')
.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/notes', {
        templateUrl: 'templates/index-template.html',
        controller: 'cardsController'
        })
        .when('/', {
        templateUrl: 'templates/index-template.html',
        controller: 'cardsController'
        })
        .when('/methods/:cardUid', {
        templateUrl: 'templates/methods-template.html',
        controller: 'cardDetailController'
        })
        .otherwise({
            redirectTo: "/"
        });

}]);

angular.module('cookbook').controller('cardsController',  function($scope, $http) {

  // $scope.order_id = $routeParams.orderId;
    $http.get('/drupal/content/method-cards-homepage').success(function(data)
    {
        $scope.cards=(function()
        {
        
            return data.nodes;

        }());
    });
});

angular.module('cookbook').controller('cardDetailController',  function($scope, $http,$routeParams) {

  // $scope.order_id = $routeParams.orderId;
    $http.get('/drupal/rest/node/'+$routeParams.cardUid).success(function(data)
    {
        $scope.card=data;   //good
    });
});