

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
        //for DT lessons
        .when('/method_card/:cardUid', {
            templateUrl: '/app/method-card/templates/methods-template.html',
            controller: 'cardDetailController'
        })
        //for classroom management
        .when('/class_tip/:cardUid', {
            templateUrl: '/app/classroom-tip/templates/classroom-tip-template.html',
            controller: 'tipDetailController'
        })
        //for Courses
        .when('/course_example/:cardUid', {
            templateUrl: '/app/method_card/templates/methods-template.html',
            controller: 'cardDetailController'
        })
        //Creative Mindsets
        .when('/stoke/:cardUid', {
            templateUrl: '/app/creative-mindset/templates/mindset-template.html',
            controller: 'mindsetDetailController'
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
        .when('/about/',{
            templateUrl:'/app/about/templates/about.html',
            controller: 'aboutController'
        })
        .when('/login/',{
            templateUrl:'/app/login/templates/login-template.html'
        })
        .when('/register/',{
            templateUrl:'/app/register/templates/register-template.html',
            controller:'registerController'
        })
        .when('/activation/',{
            templateUrl:'/app/register/templates/activation-template.html',
            controller:'activationController'
        })
        .when('/reset-password/',{
            templateUrl:'/app/register/templates/reset-password-template.html',
            controller:'resetPassController'
        })
        .when('/login/',{
            templateUrl:'/app/login/templates/login-template.html',
            controller:'loginController'
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

// angular.module('cookbook').directive('routeLoadingIndicator', function($rootScope) {
//   return {
//     restrict: 'E',
//     template: "<div ng-show='isRouteLoading' class='loading-indicator'>" +
//     "<div class='loading-indicator-body'>" +
//     "<h3 class='loading-title'>Loading...</h3>" +
//     "<div class='spinner'><circle-spinner></circle-spinner></div>" +
//     "</div>" +
//     "</div>",
//     replace: true,
//     link: function(scope, elem, attrs) {
//       scope.isRouteLoading = false;
 
//       $rootScope.$on('$routeChangeStart', function() {
//         scope.isRouteLoading = true;
//       });
//       $rootScope.$on('$routeChangeSuccess', function() {
//         window.setTimeout(function()
//         {
//                 scope.isRouteLoading = false;
//         },100);
//       });
//     }
//   };
// });


