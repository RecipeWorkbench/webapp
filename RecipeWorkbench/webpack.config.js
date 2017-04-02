var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        home: "./pages/home/index.js",
        contribution: "./pages/contribution/index.js"
    },
    output: {
        path: path.join(__dirname, "public/dist"),
        filename: "[name].bundle.js"
    },
    externals: {
        "knockout": "knockout"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            minChunks: Infinity
        })
    ]
};
