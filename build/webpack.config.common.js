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
        alias: {
            'utils': resolvePath('../src/utils')
        }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
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