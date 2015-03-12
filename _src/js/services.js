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
