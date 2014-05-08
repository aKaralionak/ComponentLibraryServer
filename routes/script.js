var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    scriptTask = require('../gulp/scripts.js'),
    router = express.Router();

router.get('/:components?', function (req, res) {
    var root = __dirname.replace('routes', 'build'),
        components = req.param('components').toLowerCase().split(',').sort(),
        bundleName = components.join(''),
        pathOnServer = 'js/' + bundleName + '.js',
        pathToFile = path.join(root, pathOnServer),
        compBasePath = [];
    components.forEach(function (item) {
        return compBasePath.push(path.join(__dirname.replace('routes', 'components'), item, '*.js'));
    });

    fs.stat(pathToFile, function (err, fd) {
        scriptTask(res, err, compBasePath, bundleName, root, pathOnServer);
    });
});
module.exports = router;