define({
    loaderOptions: {
        packages: [{
            name: 'SOURCES',
            location: 'src'
        }]
    },

    reporters: [{
        id: 'Lcov',
        filename: 'report/js.lcov' // Directory needs to exist before
    }, {
        id: 'Console'
    }, {
        id: 'JUnit',
        filename: 'report/unit.xml'
    }],

    // Non-functional test suite(s) to run in each browser
    suites: [
        'tests/vanilla/hello.spec'
    ],

    // A regular expression matching URLs to files that should not be included in code coverage analysis
    excludeInstrumentation: /^(?:tests|node_modules)\//
});