'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'del', 'run-sequence']
    }),
    SonarWebReporters = require("sonar-web-frontend-reporters"),
    SonarWebDuplication = require("sonar-web-frontend-duplication"),

    mkdirp = require('mkdirp'),

    projectName = 'sonar-web-frontend-helloworld',
    projectPath = 'src';

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
gulp.task('tests-folder', function() {
    if (!fs.existsSync("reports/sonar")){
        mkdirp.sync("reports/sonar");
    }
    return true;
});

gulp.task('tests-js', ['tests-folder'], function() {
    return gulp.src('')
        .pipe($.run('intern-client config=tests/intern-vanilla'));
});

gulp.task('tests-it', ['tests-folder'], function() {
    return gulp.src('')
        .pipe($.run('intern-runner config=tests/intern-integration.local'));
});

gulp.task('tests', function() {
    return $.runSequence(
        'tests-js', 'tests-it'
    );
});