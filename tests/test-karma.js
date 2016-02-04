'use strict';

describe('tests.vanilla.hello', function() {
    it('should reply hello', function() {
        expect(helloModule.hello()).toEqual('hello');
    });
});