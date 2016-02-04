define([
    'intern/chai!expect',
    'intern!bdd',
    'SOURCES/hello-world'
], function(expect, bdd) {

    bdd.describe('test.vanilla.hello', function() {

        bdd.it('should reply hello', function() {
            expect(helloModule.hello()).to.equal('hello');
        });

    });
});