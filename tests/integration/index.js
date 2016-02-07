define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    var url = '../../src/hello-world.html';

    registerSuite({
        name: 'tests.integration.index',

        'input read': function () {
            return this.remote
                .get(require.toUrl(url))
                
                .findById('inputRead')
                .getProperty('value')
                .then(function (value) {
                    assert.strictEqual(value, 'hello', 'Input read');
                });
        }
    });
});