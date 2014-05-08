var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    router = express.Router();

router.get('/:components?', function (req, res) {
    var root = __dirname.replace('routes', 'build'),
        components = req.param('components').split(',').sort(),
        bundleName = components.join(''),
        pathOnServer = 'css/' + bundleName + '.css',
        pathToFile = path.join(root, pathOnServer),
        compBasePath = [];
    components.forEach(function (item) {
        return compBasePath.push(path.join(__dirname.replace('routes', 'components'), item, '*.less'));
    });
    fs.stat(pathToFile, function (err, fd) {
        if (err) {
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
    });
});

module.exports = router;