'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'del', 'run-sequence']
    }),
    SonarWebReporters = require("sonar-web-frontend-reporters"),
    SonarWebDuplication = require("sonar-web-frontend-duplication"),

    mkdirp = require('mkdirp'),

    reportsPath = 'reports/',
    projectName = 'sonar-web-frontend-helloworld',
    projectPath = 'src';

gulp.task('clean', function() {
    return $.del(reportsPath);
});

/**
 * LINTING
 */
gulp.task('lint', function() {
    return SonarWebReporters.launchReporters({
        project: projectName, 
        css : true,
        scss : true,
        html : true,
        js : true,
        eslint : true
    });
});


/**
 * Duplication
 */
gulp.task('duplication', function() {
    return SonarWebDuplication.launchReporters({
        project: projectName, 
        css : true,
        scss : true,
        html : true,
        js : true
    });
});

/**
 * Tests
 */

gulp.task('tests-js', function() {
    return gulp.src('')
        .pipe($.run('intern-client config=tests/intern-vanilla'));
});

gulp.task('tests-it', function() {
    return gulp.src('')
        .pipe($.run('intern-runner config=tests/intern-integration.local'));
});

gulp.task('tests', function() {
    return $.runSequence(
        'tests-js', 'tests-it'
    );
});
