module.exports = {
    context: __dirname,
    entry: {
        'bundle': './src/index.js'
    },
    devtool: 'source-map',
    output: {
        path: 'dest/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    }
};
