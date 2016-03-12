var webpackConf = require('./webpack.base.conf');
delete webpackConf.plugins;
delete webpackConf.entry;

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['spec'],
        files: ['../test/unit/index.js'],
        preprocessors: {
            '../test/unit/index.js': ['webpack'],
        },
        webpack: webpackConf,
        webpackMiddleware: {
            noInfo: true,
        },
        proxies: {
            '/test.png': 'https://placeholdit.imgix.net/~text?w=1&h=1',
        },
    });
};
