'use strict';

var module = (function() {

    var hello = function() {
            console.log('hello');
        },

        helloDuplicate = function() {
            console.log('hello');
        };

    return {
        hello: hello,
        helloDuplicate: helloDuplicate
    };
})();
