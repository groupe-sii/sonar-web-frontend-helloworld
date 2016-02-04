define([
    'intern/chai!expect',
    'intern!bdd',
    'SOURCES/hello-world'
], function(expect, bdd) {

    bdd.describe('test.vanilla.hello-world', function() {

        bdd.it('should reply hello', function() {
            expect(module.hello()).to.equal('hello');
        });

    });
});