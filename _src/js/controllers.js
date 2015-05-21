/*global angular, nilsApp, console */

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

nilsApp.controller('BlogPostCtrl', ['$scope', '$routeParams', '$http', '$location', 'Blog', function ($scope, $routeParams, $http, $location, Blog) {
    'use strict';
    $scope.post = Blog.get({postSlug: $routeParams.postSlug});
    $scope.postUrl = $location.absUrl();
    $http.get('blog/html/' + $routeParams.postSlug + '.html').success(function (data) {
        $scope.postHtml = data;
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
