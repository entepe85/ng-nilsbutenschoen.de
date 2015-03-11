/*global angular */
var nilsServices = angular.module('nilsServices', ['ngResource']);

nilsServices.factory('Blog', ['$resource',
    function ($resource) {
        'use strict';
        return $resource('blog/posts.json', {}, {});
    }]);

nilsServices.factory('Post', ['$resource',
    function ($resource) {
        'use strict';
        return $resource('blog/posts/:postSlug.:format', {}, {
            meta: {method: 'GET', params: {format: 'json'}},
            content: {method: 'GET', params: {format: 'html'}}
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
