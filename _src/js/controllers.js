/*global angular, nilsApp, console */

/**
* Controls the Blog
*/
nilsApp.controller('BlogCtrl', ['$scope', 'Blog', function ($scope, Blog) {
    'use strict';
    $scope.posts = Blog.query();
}]);

nilsApp.controller('BlogPostCtrl', ['$scope', '$routeParams', '$http', 'Blog', function ($scope, $routeParams, $http, Blog) {
    'use strict';
    $scope.post = Blog.get({postSlug: $routeParams.postSlug});
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
