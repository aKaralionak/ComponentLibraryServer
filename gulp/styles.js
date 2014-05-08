/**
 * Base gulp task to generate Styles bundles
 */
var path = require('path'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    stylesTask = function (res, flag, compBasePath, bundleName, root, pathOnServer) {
        if (flag) {
            gulp.task('style', function () {
                return gulp.src(compBasePath)
                    .pipe(less())
                    .pipe(concat(bundleName + '.css'))
                    .pipe(gulp.dest(path.join(root, 'css')));
            });
            gulp.run('style', function () {
                return res.sendfile('build/' + pathOnServer);
            });

        } else {
            res.sendfile('build/' + pathOnServer);
        }
    };
module.exports = stylesTask;