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
        'clean', 'js-hint', 'css-lint', 'html-hint', 'scss-lint', 'eslint'
    );
});
