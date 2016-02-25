var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            'moment',
            'vue',
            'vue-resource',
            'vue-router',
        ],
        app: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/themes/beeasyboards/dist/',
        filename: '[name].js',
    },
    resolve: {
        root: path.resolve(__dirname, '../src'),
        extensions: ['', '.js', '.vue'],
        alias: {
            'src': path.resolve(__dirname, '../src'),
        },
    },
    sassLoader: {
        includePaths: [
            path.resolve(__dirname, '../src/scss'),
            path.resolve(__dirname, '../node_modules'),
        ],
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue',
            },
            {
                test: /\.js$/,
                loader: 'babel', // babel!eslint
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 15000,
                    name: '[name].[ext]?[hash:7]',
                },
            },
        ],
    },
    vue: {
        loaders: {
            js: 'babel', // babel!eslint
        },
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    ],
    // eslint: {
    //     formatter: require('eslint-friendly-formatter'),
    // },
};
