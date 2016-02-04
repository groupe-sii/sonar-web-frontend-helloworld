define([
    'intern/chai!expect',
    'intern!bdd',
    'SOURCES/hello-world'
], function(expect, bdd) {

    bdd.describe('tests.vanilla.hello', function() {

        bdd.it('should reply hello', function() {
            expect(helloModule.hello()).to.equal('hello');
        });

    });
});