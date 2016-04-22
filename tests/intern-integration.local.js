define([
    './intern-integration'
], function(intern) {
    intern.tunnel = 'NullTunnel';
    intern.tunnelOptions = {
        hostname: 'localhost',
        port: 4444
    };

    intern.reporters = [{
        id: 'tests/JUnitSonarReporter',
        filename: 'reports/sonar/js-it.xml' // Directory needs to exist before
    }, {
        id: 'Console'
    }, {
        id: 'Lcov',
        filename: 'reports/sonar/js-it.lcov' // Directory needs to exist before
    }];

    // Non-functional test suite(s) to run in each browser
    intern.functionalSuites = [
        'tests/integration/index'
    ];

    return intern;
});
