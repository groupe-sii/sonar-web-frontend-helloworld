'use strict';

angular.module('myfilter-module', [])
    .filter('toUpperCase', function() {
        return function(input) {
        	console.log('Hello world!');
            return input.toUpperCase();
        };
    });
