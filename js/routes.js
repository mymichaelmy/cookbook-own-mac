var rootURL="127.0.0.1";   //save root url

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
        .when('/search/:searchTerm', {
            templateUrl: 'search/search-template.html',
            controller: 'searchResultController'

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
        $scope.card=data;
    });
});


//search resutl controller
angular.module('cookbook').controller('searchResultController',  function($scope, $http,$routeParams) {

    var url="http://127.0.0.1:8983/solr/drupal/select?q="+$routeParams.searchTerm+"&wt=json&indent=true&hl=true&fq=ss_language:und";
    $http.get(url).success(function(data)
    {
        $scope.results=data.response.docs;
        $scope.highlighting=data.highlighting;
    });
});