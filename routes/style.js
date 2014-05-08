var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    stylesTask = require('../gulp/styles.js'),
    router = express.Router();

router.get('/:components?', function (req, res) {
    var root = __dirname.replace('routes', 'build'),
        components = req.param('components').toLowerCase().split(',').sort(),
        bundleName = components.join(''),
        pathOnServer = 'css/' + bundleName + '.css',
        pathToFile = path.join(root, pathOnServer),
        compBasePath = [];
    components.forEach(function (item) {
        return compBasePath.push(path.join(__dirname.replace('routes', 'components'), item, '*.less'));
    });
    fs.stat(pathToFile, function (err, fd) {
        stylesTask(res, err, compBasePath, bundleName, root, pathOnServer);
    });
});
module.exports = router;