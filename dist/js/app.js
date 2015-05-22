/*global angular */
angular.module('nilsAnimations', ['ngAnimate']);

/*global angular, $scope */

var nilsApp = angular.module('nilsApp', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'uiGmapgoogle-maps',
    'viewhead',
    'nilsServices',
    'angular-loading-bar'
])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        'use strict';
        cfpLoadingBarProvider.includeSpinner = false;
    }]);

/**
* Configure the Routes
*/
nilsApp.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
    // Home
        .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
        .when("/music", {templateUrl: "partials/music.html", controller: "PageCtrl"})
        .when("/vita", {templateUrl: "partials/vita.html", controller: "VitaPageCtrl"})
        .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // Blog
        .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
        .when("/blog/posts/:postSlug", {templateUrl: "partials/blog_post.html", controller: "BlogPostCtrl"})
        .when("/blog/tags/:tagName", {templateUrl: "partials/category_list.html", controller: "CatListCtrl"})
    // else redirect to 404 page
        .otherwise({templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/*global angular, nilsApp, console, window, document */

// Global controller

nilsApp.controller('nilsCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    'use strict';
    $scope.openNav = function () {
        angular.element('#sidebar').addClass('open');
    };
    $scope.closeNav = function () {
        angular.element('#sidebar').removeClass('open');
    };
    $scope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            if (angular.element('#sidebar').hasClass('open')) {
                angular.element('#sidebar').removeClass('open');
            }
        }, 250);
    });
}]);

/**
* Controls the Blog
*/
nilsApp.controller('BlogCtrl', ['$scope', 'Blog', function ($scope, Blog) {
    'use strict';
    $scope.posts = Blog.query();
}]);

nilsApp.controller('BlogPostCtrl', ['$scope', '$routeParams', '$http', '$location', '$browser', 'Blog', function ($scope, $routeParams, $http, $location, $browser, Blog) {
    'use strict';
    $scope.post = Blog.get({postSlug: $routeParams.postSlug});
    $scope.postUrl = $location.absUrl();
    $http.get('blog/html/' + $routeParams.postSlug + '.html').success(function (data) {
        $scope.postHtml = data;
    });
    $scope.$on('$routeChangeSuccess', function () {
        $browser.notifyWhenNoOutstandingRequests(function () {
            var scrollTop = angular.element('section.content').offset().top;
            angular.element('html, body').stop().animate({ scrollTop: scrollTop }, 500);
        });
    });
}]);

nilsApp.controller('CatListCtrl', ['$scope', '$routeParams', 'CatList', '$filter', function ($scope, $routeParams, CatList, $filter) {
    'use strict';
    CatList.list(function (data) {
        $scope.catposts = $filter('filter')(data, {tags: $routeParams.tagName});
    });
    $scope.tag = $routeParams.tagName;
}]);

/**
* Controls all other Pages
*/
nilsApp.controller('PageCtrl', ['$scope', function ($scope) {
    'use strict';
    $scope.map = { center: { latitude: 54.391528, longitude: 10.173766 }, zoom: 12 };
}]);

// VITA Controller
nilsApp.controller('VitaPageCtrl', ['$scope', '$filter', 'Vita', function ($scope, $filter, Vita) {
    'use strict';
    Vita.query(function (data) {
        $scope.skills = $filter('filter')(data, {type: "skill"});
        $scope.experience = $filter('filter')(data, {type: "experience"});
        $scope.education = $filter('filter')(data, {type: "education"});
    });
}]);


/**
* Navigation controller
*/
nilsApp.controller('NavCtrl', ['$scope', '$location', 'cfpLoadingBar', function ($scope, $location, cfpLoadingBar) {
    'use strict';
    $scope.items = [
        { path: '/music', title: 'Musik' },
        { path: '/vita', title: 'Vita' },
        { path: '/contact', title: 'Kontakt' },
        { path: '/blog', title: 'Blog' }
    ];
    $scope.isActive = function (item) {
        if (item.path === $location.path()) {
            return true;
        }
        return false;
    };
    $scope.$on('$routeChangeStart', function () {
        cfpLoadingBar.start();
    });
    $scope.$on('$routeChangeSuccess', function () {
        cfpLoadingBar.complete();
    });
}]);

/*global angular */
var nilsServices = angular.module('nilsServices', ['ngResource']);

nilsServices.factory('Blog', ['$resource',
    function ($resource) {
        'use strict';
        return $resource('blog/:postSlug.json', {}, {
            query: {method: 'GET', params: {postSlug: 'posts'}, isArray: true}
        });
    }]);

nilsServices.factory('CatList', ['$resource',
    function ($resource) {
        'use strict';
        return $resource('blog/posts.json', {}, {
            list: {method: 'GET', isArray: true}
        });
    }]);

nilsServices.factory('Vita', ['$resource',
    function ($resource) {
        'use strict';
        return $resource('vita/skills.json', {}, {});
    }]);
