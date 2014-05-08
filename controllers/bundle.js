var

    bundle = {
    base: function (opt, cf) {

    },
    styles: function (opt, cf) {

    },
    scripts: function (opt, cf) {

    },
    images: function (opt, cf) {

    },
    bundle: function (opt, cf) {

    }
};



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
