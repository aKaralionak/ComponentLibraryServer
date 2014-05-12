var path = path = require('path'),
    component = {
        getComponentsNames: function (query) {
            return query.toLowerCase().split(',').sort();
        },
        getComponentsPaths: function (components, options, type) {
            var componentsPaths = [];
            components.forEach(function (item) {
                return componentsPaths.push(path.join(options.root, options.compFolder, item, '*.' + type));
            });
            return componentsPaths;
        },
        getBundleName: function (components) {
            return components.join();
        },
        getBundleRoute: function (bundleName, type) {
            return type + '/' + bundleName + '.' + type;
        },
        getBundlePath: function (bundleName, options, type) {
            return path.join(options.root, options.dest, type, bundleName + '.' + type);
        },

        getOptions: function (query, options, type) {
            var me = this,
                components = me.getComponentsNames(query),
                componentPaths = me.getComponentsPaths(components, options, type),
                bundleName = me.getBundleName(components),
                bundleRoute = me.getBundleRoute(bundleName, type),
                bundlePath = me.getBundlePath(bundleName, options, type);
            return {
                bundlesRoot: path.join(options.root, options.dest),
                componentsPaths: componentPaths,
                bundleName: bundleName,
                bundlePath: bundlePath,
                bundleRoute: bundleRoute
            };
    }
};
module.exports = component;