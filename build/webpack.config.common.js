const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolvePath = (filePath) => {
    return path.resolve(__dirname, filePath)
}

const config = {
    entry: resolvePath('../src/index.ts'),
    output: {
        filename: 'bundle.js',
        path: resolvePath('..dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'js-common-util',
            filename: 'index.html',
            template: resolvePath('../test/index.html'),
        }),
    ]
}

module.exports = { resolvePath, config };