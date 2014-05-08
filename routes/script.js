var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    router = express.Router();

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

router.get('/:components?', function (req, res) {
    var root = __dirname.replace('routes', 'build'),
        components = req.param('components').split(',').sort(),
        bundleName = components.join(''),
        pathOnServer = 'js/' + bundleName + '.js',
        pathToFile = path.join(root, pathOnServer),
        compBasePath = [];
    components.forEach(function (item) {
        return compBasePath.push(path.join(__dirname.replace('routes', 'components'), item, '*.js'));
    });

    fs.stat(pathToFile, function (err, fd) {
        if (err) {
            gulp.task('script', function () {
                return gulp.src(compBasePath)
                        .pipe(concat(bundleName + '.js'))
                        .pipe(browserify({ debug: false }))
                        .pipe(clean({force: true}))
                        .pipe(gulp.dest(path.join(root, 'js')));
            });
            gulp.run('script', function () {
                return res.sendfile('build/' + pathOnServer);
            });

        } else {
            res.sendfile('build/' + pathOnServer);
        }
    });
});

module.exports = router;