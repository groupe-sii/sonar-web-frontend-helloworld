'use strict';

var helloModule = (function(){

	var hello = function() {
		return 'hello';
	};

	return {
		hello: hello
	};
})();
