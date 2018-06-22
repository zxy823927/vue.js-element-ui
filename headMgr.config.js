var config = require('./webpackConfig');
var webpack = require('webpack');

const moduleName = "headMgr";
var options = {
    key: moduleName,
    //定义各模块的入口
    modules: {
        [moduleName]: './apps/'+moduleName+'/main.js'
    },
    port: 8012
    // loaders: []
}
module.exports = config.webpack(options);