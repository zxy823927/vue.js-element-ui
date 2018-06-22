第一次启动在当前目录运行npm install命令
启动服务时运行npm run dev-xxxx代表启动xxxx模块（如果启动headMgr模块，就运行npm run dev-headMgr）
http://localhost:8012/apps/headMgr/#/checkWork/dishCombo/10069454/020114 本地启动
新增模块步骤：
    在package.json中的 script添加如下代码，xxxx代表新增加的模块
    "dev-xxxx": "cross-env NODE_ENV=development webpack-dev-server --hot --config xxxx.config.js",
    "build-xxxx": "cross-env NODE_ENV=production webpack --progress --hide-modules --config xxxx.config.js",
    根目录下新建xxxx.config.js文件

目录结构如下：

--apps
    --headMgr   总部管理模块
        --demo                  demo功能
        --login                 登陆功能
            --components        登陆组件
            --config            登陆配置文件（存放登陆功能的请求url等）
            --styles            登陆模块的样式文件  
        --router                路由配置文件
        --index.html            模块入口文件
        --main.js               入口文件对应js
    --pub                       公共的模块，提供公共util类和组件
    --shopMgr                   店铺管理模块
--package.json                  依赖的第三方控件和启动各个模块的例子
--headMgr.config.js             总部管理模块启动配置文件
--webpackConfig.js              公共的默认配置文件