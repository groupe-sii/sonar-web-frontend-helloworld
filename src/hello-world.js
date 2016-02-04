'use strict';

var module = (function(){

	var hello = function() {
		console.log('hello');
        return 'hello';
	};

	return {
		hello: hello
	};
})();
