const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    publicPath: '/knowledge',
    devServer: {
        proxy: {
            '/api1': {
<<<<<<< HEAD
                target: 'http://192.168.3.48:8083', // 刘珏先 api
=======
                target: 'http://192.168.3.99:8083', // 刘珏先 api
>>>>>>> 7229304835657d23d078f4f7992f53f71f1ec107
                changeOrigin: true,
                pathRewrite: {
                    '^/api1': '/'
                }
            },
            '/api2': {
                target: 'http://192.168.3.99:8088', // 王夏冰 api
                changeOrigin: true,
                pathRewrite: {
                    '^/api2': '/app/authcenter/api'
                }
            },
            '/api3': {
                target: 'http://192.168.3.120:3000', // 夏添 api
                changeOrigin: true,
                pathRewrite: {
                    '^/api3': '/api'
                }
            },
            '/api4': {
                target: 'http://192.168.3.99:8083', // 王夏冰 api2
                changeOrigin: true,
                pathRewrite: {
                    '^/api4': '/'
                }
            },
            '/api5': {
                target: 'http://192.168.3.48:8083/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api5': '/'
                }
            },
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
