'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'del', 'run-sequence']
    }),
    SonarWebReporters = require("sonar-web-frontend-reporters"),

    mkdirp = require('mkdirp'),

    reportsPath = 'report/',
    projectName = 'sonar-web-frontend-helloworld',
    projectPath = 'src',

    jsSources = 'src/**/*.js',
    cssSources = 'src/**/*.css',
    htmlSources = 'src/**/*.html',
    scssSources = 'src/**/*.scss';

gulp.task('clean', function() {
    return $.del(reportsPath);
});

/**
 * LINTING
 */
gulp.task('lint', function() {
    return SonarWebReporters.launchReporters({
        project: projectName, 
        css : {report: 'report/csslint.json'},
        scss : {report: 'report/scsslint.json'},
        html : {report: 'report/htmlhint.json'},
        js : {report: 'report/jshint.json'},
        eslint : {report: 'report/eslint-angular.json', base: 'src'}
    });
});

/**
 * Duplication
 */

gulp.task('jscpd-js', function() {
  return gulp.src(jsSources)
    .pipe($.jscpd({
        'min-lines': 2,
        silent     : true,
        languages  : ['javascript'],
        output     : reportsPath + 'js-duplication.xml'
    }));
});

gulp.task('jscpd-css', function() {
  return gulp.src(cssSources)
    .pipe($.jscpd({
        'min-lines': 2,
        'min-tokens': 5,
        silent     : true,
        languages  : ['css'],
        output     : reportsPath + 'css-duplication.xml'
    }));
});

gulp.task('jscpd-html', function() {
  return gulp.src(htmlSources)
    .pipe($.jscpd({
        'min-lines': 2,
        silent     : true,
        languages  : ['htmlmixed'],
        output     : reportsPath + 'html-duplication.xml'
    }));
});

gulp.task('jscpd-scss', function() {
  return gulp.src(scssSources)
    .pipe($.jscpd({
        'min-lines': 2,
        'min-tokens': 5,
        silent     : true,
        languages  : ['css'],
        output     : reportsPath + 'scss-duplication.xml'
    }));
});

gulp.task('jscpd', function() {
    return $.runSequence(
        'jscpd-js', 'jscpd-css', 'jscpd-html', 'jscpd-scss'
    );
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
