var scriptTask = require('../gulp/scripts'),
    styleTask = require('../gulp/styles'),
    fs = require('fs'),
    helper = require('../helpers/component'),
    bundle = {
        base: function (res, opt, cf, type, query) {
            var options = helper.getOptions(query, opt, type);
            fs.stat(options.bundlePath, function (err) {
               console.info(err);
               cf(res, err, options);
            })
        },
        styles: function (res, opt, query) {
            this.base(res, opt, styleTask, 'css', query);
        },
        scripts: function (res, opt, query) {
            this.base(res, opt, scriptTask, 'js', query);
        },
        images: function (opt, cf) {

        },
        bundle: function (opt, cf) {

        }
};
module.exports = bundle;
