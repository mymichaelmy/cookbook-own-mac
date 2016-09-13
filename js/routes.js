

angular.module('cookbook')
.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/notes', {
            templateUrl: '/app/index/templates/index-template.html',
            // controller: 'cardsController'
        })
        .when('/', {
            templateUrl: '/app/index/templates/index-template.html',
            controller: 'homeController'
        })
        .when('/method_card/:cardUid', {
            templateUrl: '/app/method_card/templates/methods-template.html',
            controller: 'cardDetailController'
        })
        .when('/class_tip/:cardUid', {
            templateUrl: '/app/classroom-tip/templates/classroom-tip-template.html',
            controller: 'tipDetailController'
        })
        .when('/course_example/:cardUid', {
            templateUrl: '/app/method_card/templates/methods-template.html',
            controller: 'cardDetailController'
        })
        .when('/search/:searchTerm', {
            templateUrl: '/app/search/search-template.html',
            controller: 'searchResultController'
        })
        .when('/collection',{
            templateUrl:'/app/collection/collection-template.html',
            controller:'collectionController'
        })
        .when('/explore/',{
            templateUrl:'/app/explore/templates/explore-template.html',
            controller:'exploreController'
        })
        .when('/explore/:category',{
            templateUrl:'/app/explore/templates/explore-template.html',
            controller:'exploreController'
        })
        .when('/recipe_list/',{
            templateUrl:'/app/recipe-list/templates/recipe-list-template.html',
            controller:'recipeListController'
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




