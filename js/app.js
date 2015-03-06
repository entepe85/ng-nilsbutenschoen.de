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
        .when("/", {templateUrl: "_partials/home.html", controller: "PageCtrl"})
    // Pages
        .when("/music", {templateUrl: "_partials/music.html", controller: "PageCtrl"})
        .when("/vita", {templateUrl: "_partials/vita.html", controller: "VitaPageCtrl"})
        .when("/contact", {templateUrl: "_partials/contact.html", controller: "PageCtrl"})
    // Blog
        .when("/blog", {templateUrl: "_partials/blog.html", controller: "BlogCtrl"})
        .when("/blog/posts/:postSlug", {templateUrl: "_partials/blog_post.html", controller: "BlogPostCtrl"})
        .when("/blog/tags/:tagName", {templateUrl: "_partials/category_list.html", controller: "CatListCtrl"})
    // else redirect to Home
        .otherwise({templateUrl: "_partials/404.html", controller: "PageCtrl"});
}]);
