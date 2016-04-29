define({
    loaderOptions: {
        packages: [{
            name: 'SOURCES',
            location: 'src'
        }]
    },

    reporters: [{
        id: 'Lcov',
        filename: 'reports/sonar/js-ut.lcov' // Directory needs to exist before
    }, {
        id: 'Console'
    }, {
        id: 'tests/JUnitSonarReporter',
        filename: 'reports/sonar/js-ut.xml' // Directory needs to exist before
    }],

    // Non-functional test suite(s) to run in each browser
    suites: [
        'tests/vanilla/hello'
    ],

    // A regular expression matching URLs to files that should not be included in code coverage analysis
    excludeInstrumentation: /^(?:tests|node_modules)\//
});