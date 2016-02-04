// Karma configuration
module.exports = function(config) {

    var source = 'src/hello-world.js';

    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        files: [
            source,
            'tests/test-karma.js'
        ],
        plugins: [
            'karma-jasmine',
            'karma-junit7-sonarqube-reporter',
            'karma-phantomjs-launcher'
        ],
        reporters: ['progress', 'junit'],
        browsers: ['PhantomJS'],
        logLevel: config.LOG_INFO,
        colors: true,
        singleRun: true,
        junitReporter: {
            outputFile: 'report/karma.xml',
            suite: ''
        }
    });
};
