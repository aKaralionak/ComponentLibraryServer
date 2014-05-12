/**
 * Base gulp task to generate Styles bundles
 */
var path = require('path'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    stylesTask = function (res, flag, options) {
        if (flag) {
            gulp.task('style', function () {
                return gulp.src(options.componentsPaths)
                    .pipe(less())
                    .pipe(concat(options.bundleName + '.css'))
                    .pipe(gulp.dest(path.join(options.root, 'css')));
            });
            gulp.run('style', function () {
                return res.sendfile('build/' + options.bundleRoute);
            });

        } else {
            res.sendfile('build/' + options.bundleRoute);
        }
    };
module.exports = stylesTask;