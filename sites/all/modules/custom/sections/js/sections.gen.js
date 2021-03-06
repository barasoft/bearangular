'use strict';

var sectionsApp = angular.module('sectionsApp', [
  'ngRoute',
  'ngSanitize',
  'ngAnimate',
  'sectionsDirectives',
  'sectionsControllers'
]);

sectionsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/sites/all/modules/custom/sections/templates/sections.html',
      controller: 'sectionsCtrl'
    })
    .when('/section/:tid', {
      templateUrl: '/sites/all/modules/custom/sections/templates/articles.html',
      controller: 'articlesCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

jQuery(document).ready(function() {
  angular.bootstrap(document.getElementById('sections-app'), ['sectionsApp']);
});

'use strict';

var sectionsControllers = angular.module('sectionsControllers', []);

sectionsControllers
.controller('sectionsCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
  $http.get('/json/sections').success(function(result) {
    $scope.sections = (function () {
      return result.taxonomy;
    })();
  });
}])
.controller('articlesCtrl', ['$scope', '$routeParams', '$http', '$sce',
  function($scope, $routeParams, $http, $sce) {
  $http.get('/json/' + $routeParams.tid + '/articles')
    .success(function(result) {
      $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
      };
      $scope.articles = (function () {
        return result.node;
      })();
  });
}]);

var sectionsDirectives = angular.module('sectionsDirectives', []);

sectionsDirectives.directive('keyNav', function() {
  return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {
          angular.element(element).keynav();
        }
      };
});

sectionsDirectives.directive('prism', ['$compile', function($compile) {
    return function(scope, elem, attrs) {
        scope.$watch('article.article.body', function (value) {
            Prism.highlightAll();
        });
        //create an angular element. (this is still our "view")
        var el = angular.element(),

        //compile the view into a function.
        compiled = $compile(el);

        //append our view to the element of the directive.
        elem.append(el);

        //bind our view to the scope
        compiled(scope);
    };
}]);
