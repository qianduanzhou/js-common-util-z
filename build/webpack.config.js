const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { config: commonfig, resolvePath } = require('./webpack.config.common');

module.exports = merge(commonfig, {
    mode: 'production',
    devtool: false,
    output: {
        libraryTarget: "commonjs-module",//导出模块
    },
    optimization: {
        minimize: true, // 开启代码压缩
    },
    module: {
        rules: [],
    },
    plugins: [
        new CleanWebpackPlugin(), // 编译之前清空 /dist
    ]
});