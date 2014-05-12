/**
 * Base gulp task to generate Script bundles
 */
var path = require('path'),
    gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    scriptTask = function (res, flag, options) {
        if (flag) {
            gulp.task('script', function () {
                return gulp.src(options.componentsPaths)
                    .pipe(concat(options.bundleName + '.js'))
                    .pipe(browserify({ debug: false }))
                    .pipe(gulp.dest(path.join(options.bundlesRoot)));
            });
            gulp.run('script', function () {
                return res.sendfile(options.bundlePath);
            });

        } else {
            res.sendfile(options.bundlePath);
        }
    }
module.exports = scriptTask;