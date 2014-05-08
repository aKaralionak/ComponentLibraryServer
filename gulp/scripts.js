/**
 * Base gulp task to generate Script bundles
 */
var path = require('path'),
    gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    scriptTask = function (res, flag, compBasePath, bundleName, root, pathOnServer) {
        if (flag) {
            gulp.task('script', function () {
                return gulp.src(compBasePath)
                    .pipe(concat(bundleName + '.js'))
                    .pipe(browserify({ debug: false }))
                    .pipe(gulp.dest(path.join(root, 'js')));
            });
            gulp.run('script', function () {
                return res.sendfile('build/' + pathOnServer);
            });

        } else {
            res.sendfile('build/' + pathOnServer);
        }
    }
module.exports = scriptTask;