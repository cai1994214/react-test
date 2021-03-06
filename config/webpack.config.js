const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
var config  = {
    //此处指明路口文件位置
    entry: './main.js',   //设置入口文件
    //配置打包结果，
    //path配置定义了输出的文件位置
    //filename则定义了打包结果文件的名称
    devtool: 'inline-source-map',
    output: {//输出目录
        filename: 'bundle.js',//设置导出文件为index.js
        path: path.resolve(__dirname, 'dist')//打包后的js文件存放的地方
    },
    //设置本地服务器端口号为9001，此端口可以自己设定，但记住不能与其他服务端口重复
    devServer:{
        contentBase: './dist',//tell the dev server where to look for files
        hot: true,
        inline:true,
        port:7700

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    //定义了对模块的处理逻辑，这里可以用loaders定义一系列的加载器，以及一些正则，
    //当需要加载的文件匹配test的正则时，会调用后面的loader对文件进行处理，
    //所以这就是webpack骚的可怕的地方。。。。。
    module:{
        loaders:[{
            test:/\.jsx?$/,
            exclude:/node_modules/,
            loader:'babel-loader',
            query:{
                presets:['es2015','react']
            }
        }]
    }
};

module.exports = config;