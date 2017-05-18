var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        home: "./pages/home/index.js",
        create: "./pages/create/index.js",
        recipes: "./pages/recipes/index.js",
        ingredients: "./pages/ingredients/index.js",
        compounds: "./pages/compounds/index.js",
        recipe: "./pages/recipe/index.js",
        transform: "./pages/transform/index.js"
    },
    output: {
        path: path.join(__dirname, "public/dist"),
        filename: "[name].bundle.js",
        library: 'ViewModels'
    },
    resolve: {
        modules: [path.resolve(__dirname, "components"), path.resolve(__dirname, "pages"), path.resolve(__dirname, "services"),"node_modules"]
    },
    externals: {
        "knockout": "knockout",
        "chart.js": "chart.js",
        "jquery": "jquery"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            minChunks: Infinity
        })
    ]
};
