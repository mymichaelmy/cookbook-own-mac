

angular.module('cookbook')
.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/notes', {
            templateUrl: '/templates/index-template.html',
            // controller: 'cardsController'
        })
        .when('/', {
            templateUrl: '/templates/index-template.html',
            // controller: 'cardsController'
        })
        .when('/method_card/:cardUid', {
            templateUrl: '/templates/methods-template.html',
            controller: 'cardDetailController'
        })
        .when('/class_tip/:cardUid', {
            templateUrl: '/classroom-tip/templates/classroom-tip-template.html',
            controller: 'tipDetailController'
        })
        .when('/course_example/:cardUid', {
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




