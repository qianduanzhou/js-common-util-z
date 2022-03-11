const { merge } = require('webpack-merge');
const { config: commonfig, resolvePath } = require('./webpack.config.common');

module.exports = merge(commonfig, {
    mode: 'production',
    module: {
        rules: [],
    }
});