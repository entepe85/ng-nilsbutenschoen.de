/*global angular, $scope */

var nilsApp = angular.module('nilsApp', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'uiGmapgoogle-maps'
]);

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
    // else redirect to Home
        .otherwise({templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);
