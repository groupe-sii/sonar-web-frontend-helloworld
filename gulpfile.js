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
    scssSources = 'src/**/*.scss',

    jsReporter = new SonarWebReporters.JSReporter(reportsPath + 'jshint.json'),
    cssReporter = new SonarWebReporters.CSSReporter(reportsPath + 'csslint.json'),
    htmlReporter = new SonarWebReporters.HTMLReporter(reportsPath + 'htmlhint.json'),
    scssReporter = new SonarWebReporters.SCSSReporter(reportsPath + 'scsslint.json'),
    esReporter = new SonarWebReporters.ESReporter(reportsPath + 'eslint-angular.json', 'src');

gulp.task('clean', function() {
    return $.del(reportsPath);
});

/**
 * LINTING
 */

gulp.task('js-hint', function() {
    mkdirp(reportsPath, function(err) {
        if (err) {
            console.error(err);
        } else {
            jsReporter.openReporter(projectName, projectPath);
            return gulp.src(jsSources)
                .pipe($.jshint())
                .pipe($.jshint.reporter('jshint-stylish'))
                .pipe(jsReporter.reporter)
                .on('end', jsReporter.closeReporter.bind(jsReporter));
        }
    });
});

gulp.task('css-lint', function() {
    cssReporter.openReporter(projectName, projectPath);
    return gulp.src(cssSources)
        .pipe($.csslint())
        .pipe($.csslint.reporter(cssReporter.reporter.bind(cssReporter)))
        .on('end', cssReporter.closeReporter.bind(cssReporter));
});

gulp.task('html-hint', function() {
    htmlReporter.openReporter(projectName, projectPath);
    return gulp.src(htmlSources)
        .pipe($.htmlhint())
        .pipe($.htmlhint.reporter(htmlReporter.reporter.bind(htmlReporter)))
        .on('end', htmlReporter.closeReporter.bind(htmlReporter));
});

gulp.task('scss-lint', function() {
    scssReporter.openReporter(projectName, projectPath);
    gulp.src(scssSources)
        .pipe($.scssLint({
            customReport: scssReporter.reporter.bind(scssReporter)
        }))
        .on('end', scssReporter.closeReporter.bind(scssReporter));
});

gulp.task('eslint', function() {
    esReporter.openReporter(projectName, projectPath);
    return gulp.src(jsSources)
        .pipe($.eslint({
            reset: true
        }))
        .pipe($.eslint.format(esReporter.reporter));
    ;
});

gulp.task('lint', function() {
    return $.runSequence(
        'js-hint', 'css-lint', 'html-hint', 'scss-lint', 'eslint'
    );
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
