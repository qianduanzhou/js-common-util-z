const path = require('path');

const resolvePath = (filePath) => {
    path.resolve(__dirname, filePath);
}

module.exports = {
    entry: resolvePath('../src/index.ts'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: resolvePath('../dist')
    }
};