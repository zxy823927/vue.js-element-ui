var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var cwd = process.cwd();
/**
 * Created by tk on 2017/3/7.
 * 运行配置的公共方法
 */
module.exports={
    //初始化运行时打印
    // initPrint:function(filename,printMsg){
    //     console.log('------------启动运行：'+(process.env.NODE_ENV==='prod'?'发布态':'开发态')+'------------');
    //     console.log(path.basename(filename));
    //     if((typeof printMsg)=='function'){
    //         printMsg.call();
    //     }
    //     console.log('----------------------------------------');
    // },
    getDefaultLoaders:function(){
        var imageFileName = '[name].[ext]';
        var fontFileName = '[name].[ext]?[hash]';
        var loaders = [
            {test: /\.vue$/, use: 'vue-loader'},
            {test: /\.js$/, use: 'babel-loader',
                exclude: /(node_modules)/,
            },
            {test: /\.css$/, use: ['style-loader','css-loader']},
            {test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
            {test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,use: 'file-loader'},
            {test: /\.(png|jpg|gif|svg)$/, use: 'file-loader'}
        ]

        if(process.env.NODE_ENV==='devsvr' || process.env.NODE_ENV==='devtest' || process.env.NODE_ENV==='testnew' || process.env.NODE_ENV==='aliyuntest' || process.env.NODE_ENV==='datapre'){
            loaders = [
                {test: /\.vue$/, use: 'vue-loader'},
                {test: /\.js$/, use: 'babel-loader',
                    // exclude: /(node_modules)/,
                },
                { test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader',use: 'css-loader'})},
                { test: /\.less$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader',use: 'css-loader!less-loader' }) },
                /*{test: /\.css$/, use: ['style-loader','css-loader']},
                {test: /\.less$/, use: ['style-loader','css-loader','less-loader']},*/
                { test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=' + imageFileName },
                { test: /\.(ttf\??|eot\??|svg\??|woff\??|woff2\??)/, loader: "file-loader?name=" + fontFileName }
                /*{test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,use: 'file-loader'},
                {test: /\.(png|jpg|gif|svg)$/, use: 'file-loader'}*/
            ]            
        }
        return loaders;
    },
    //默认插件集合
    getDefaultPlugins:function(key){
        var plugins = [];
        plugins.push(new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}));

        if(process.env.NODE_ENV==='devsvr' || process.env.NODE_ENV==='devtest' || process.env.NODE_ENV==='testnew' || process.env.NODE_ENV==='aliyuntest' || process.env.NODE_ENV==='datapre'){
            plugins.push(new webpack.optimize.UglifyJsPlugin({
                    // sourceMap: true
                }
            ));
            plugins.push(new webpack.LoaderOptionsPlugin({minimize: true}));
            plugins.push(new HtmlWebpackPlugin({  // 生成html文件
                filename: 'index.html',
                template: 'apps/headMgr/template.html'
            }));
            //拷贝文件
            plugins.push(new CopyWebpackPlugin([{
                from: 'apps/headMgr/favicon.ico'
            },{
                from: 'apps/headMgr/CR_ReaderX.cab'
            }]));
            plugins.push(new ExtractTextPlugin("style.css"));
            plugins.push(new webpack.optimize.CommonsChunkPlugin({names: ['common', 'manifest']}));
        }
        //提取公用模块代码，避免重复打包
        // plugins.push( new webpack.optimize.CommonsChunkPlugin('common', '/build/common.js'));

        return plugins;
    },
    getDefaultAlias:function(alias){
        //别名
        var _defaultAlias = Object.assign({
        },alias||{});
        return _defaultAlias;
    },
    webpack:function(options) {
        var key = options.key||'';
        var port = options.port||8080;
        var entry = options.modules||{};
		var devtool = options.devtool||'#eval-source-map';
        var output = {
            path: options.path||path.resolve(__dirname, './apps/'+key+'/dist'),
            publicPath: options.publicPath||'/',
            filename: options.filename||'build.js'
        };
		//线上环境
		if(process.env.NODE_ENV==='devsvr' || process.env.NODE_ENV==='devtest' || process.env.NODE_ENV==='testnew' || process.env.NODE_ENV==='aliyuntest' || process.env.NODE_ENV==='datapre'){
			devtool = 'source-map';
            output = {
                path: options.path||path.resolve(__dirname, './apps/'+key+'/dist'),
                publicPath: options.publicPath||'./',
                filename: options.filename||'[name].build.js'
            };
            entry.common = ['vue', 'element-ui','echarts','vue-amap','awe-dnd'];/*等等其他的模块*/
		}

        return {
            devServer: {//inline：内联模式，该模式下修改代码后，webpack将自动打包并且刷新浏览器，让我们看到最终的修改
                port: port
                //,contentBase:''
            },
            entry: entry,
            output: output,
            module: {
                // loaders: options.loaders||this.getDefaultLoaders()
                rules:options.loaders||this.getDefaultLoaders()
            },
            resolve: {
                alias: this.getDefaultAlias(options.alias)
            },
            plugins: options.plugins||this.getDefaultPlugins(key),
            devtool: devtool

        }
    }
}