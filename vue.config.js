const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    publicPath: process.env.BASE_URL,//'/knowledge',
    devServer: {
        disableHostCheck: true,
        // proxy: {
        //     '/file': {
        //         target: 'http://192.168.4.110:8083',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '/^file': '/'
        //         }
        //     }
        // }
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

