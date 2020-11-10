const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    publicPath: '/knowledge',
    devServer: {
        proxy: {
            '/api1': {
                target: 'http://192.168.4.166:8083', // 刘珏先 api
                changeOrigin: true,
                pathRewrite: {
                    '^/api1': '/'
                }
            },
            '/api2': {
                target: 'http://192.168.4.100:8088', // 王夏冰 api
                changeOrigin: true,
                pathRewrite: {
                    '^/api2': '/app/authcenter/api'
                }
            },
            '/api4': {
                target: 'http://192.168.4.100:8083', // 王夏冰 api2
                changeOrigin: true,
                pathRewrite: {
                    '^/api4': '/'
                }
            },
            '/cas': {
                target: 'http://192.168.4.100:8088/',
                changeOrigin: true
            },
            '/fms-basic': {
                target: 'http://glaway.soft.net/',
                changeOrigin: true
            }
        }
    },
    //webpack 链式配置   默认已经配置好了  node_moudles/@vue
    chainWebpack: config => {
        //添加别名
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("layout", resolve("src/Layout"))
            .set("base", resolve("src/base"))
            .set("static", resolve("src/static"));

    }
};

