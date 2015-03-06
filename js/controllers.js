/*global angular, nilsApp, console */

/**
* Controls the Blog
*/
nilsApp.controller('BlogCtrl', ['$scope', '$http', function ($scope, $http) {
    'use strict';
    $http.get('blog/posts.json').success(function (data) {
        $scope.posts = data;
    });
}]);

nilsApp.controller('BlogPostCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    'use strict';
    $http.get('blog/posts/' + $routeParams.postSlug + '.json').success(function (data) {
        $scope.post = data;
    });
    $http.get('blog/posts/' + $routeParams.postSlug + '.html').success(function (data) {
        $scope.postHtml = data;
    });
}]);

nilsApp.controller('CatListCtrl', ['$scope', '$routeParams', '$http', '$filter', function ($scope, $routeParams, $http, $filter) {
    'use strict';
    $http.get('/blog/posts.json').success(function (data) {
        $scope.posts = $filter('filter')(data, {tags: $routeParams.tagName});
        $scope.tag = $routeParams.tagName;
    });
}]);

/**
* Controls all other Pages
*/
nilsApp.controller('PageCtrl', ['$scope', function ($scope) {
    'use strict';
    $scope.map = { center: { latitude: 54.391528, longitude: 10.173766 }, zoom: 12 };
}]);

// VITA Controller
nilsApp.controller('VitaPageCtrl', ['$scope', '$http', function ($scope, $http) {
    'use strict';
    $http.get('vita/skills.json').success(function (data) {
        $scope.skills = data;
    });
}]);


/**
* Navigation controller
*/
nilsApp.controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
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
}]);
