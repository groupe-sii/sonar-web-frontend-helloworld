'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'del', 'run-sequence']
    }),
    SonarWebReporters = require("sonar-web-frontend-reporters"),

    mkdirp = require('mkdirp'),

    reportsPath = 'reports/',
    projectName = 'sonar-web-frontend-helloworld',
    projectPath = 'src',

    jsReporter = new SonarWebReporters.JSReporter(reportsPath + 'jshint.json'),
    cssReporter = new SonarWebReporters.CSSReporter(reportsPath + 'csslint.json');

gulp.task('clean', function() {
    return $.del(reportsPath);
});

gulp.task('js-hint', function() {
    mkdirp(reportsPath, function (err) {
        if (err) {
            console.error(err);
        } else {
            jsReporter.openReporter(projectName, projectPath);
            return gulp.src('src/**/*.js')
                .pipe($.jshint())
                .pipe($.jshint.reporter('jshint-stylish'))
                .pipe(jsReporter.reporter)
                .on('end', jsReporter.closeReporter.bind(jsReporter));
        }
    });
});

gulp.task('css-lint', function() {
    cssReporter.openReporter(projectName, projectPath);
    return gulp.src('src/**/*.css')
        .pipe($.csslint())
        .pipe($.csslint.reporter(cssReporter.reporter.bind(cssReporter)))
        .on('end', cssReporter.closeReporter.bind(cssReporter));
});

gulp.task('lint', function() {
    return $.runSequence(
        'clean', 'js-hint', 'css-lint'
    );
});
