//webpack.common.js
const path = require('path')

// 从根目录走
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    context: path.resolve(__dirname, '../'), // 入口起点根目录
    entry: {
        app: './src/index.js'
    },
    output: {
        path: resolve('build'),
        filename: '[name].js',
    }
}

//webpack.dev.js
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common,{
    mode:'development'
})

//webpack.prod.js
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'production'
})