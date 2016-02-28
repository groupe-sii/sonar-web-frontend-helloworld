// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define({
    // The port on which the instrumenting proxy will listen
    proxyPort: 9002,

    // A fully qualified URL to the Intern proxy
    proxyUrl: 'http://localhost:9002/',

    // Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
    // specified browser environments in the `environments` array below as well. See
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
    // https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
    // Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
    // automatically
    capabilities: {
        'selenium-version': '2.41.0',
        'idle-timeout': 30
    },

    environments: [
        {
            browserName: 'phantomjs'
        }
    ],

    // Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
    maxConcurrency: 3,

    tunnel: 'SauceLabsTunnel',

    // Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
    // can be used here
    loaderOptions: {
        // Packages that should be registered with the loader in each testing environment
        packages: [
            {
                name: 'SOURCES', location: 'src'
            }
        ]
    },

    // A regular expression matching URLs to files that should not be included in code coverage analysis
    excludeInstrumentation: /^(?:tests|node_modules)\//
});
