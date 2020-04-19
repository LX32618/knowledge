const path = require("path");
const resolve = dir => path.join(__dirname, dir);
//用于生产环境去除多余的css
const PurgecssPlugin = require("purgecss-webpack-plugin");
//全局文件路径
const glob = require("glob-all");
//压缩代码并去掉console
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
//代码打包zip
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
    // 废弃baseUrl  一般运维会配置好的
    publicPath: process.env.NODE_ENV === "production" ? "/configtest/" : "/",
    //打包的输出目录
    outputDir: "dist/knowledge",
    //保存是校验
    lintOnSave: true,
    //如果文件等设置
    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html"
        }
    },
    //静态资源打包路径
    assetsDir: "static",
    //默认false 可以加快打包
    productionSourceMap: false,
    //打包后的启动文件
    indexPath: "index.html",
    //打包文件是否使用hash
    filenameHashing: true,
    runtimeCompiler: false,
    transpileDependencies: [],
    //打包的css路径及命名
    css: {
        modules: false,
        //vue 文件中修改css 不生效 注释掉  extract:true
        extract: {
            filename: "style/[name].[hash:8].css",
            chunkFilename: "style/[name].[hash:8].css"
        },
        sourceMap: false,
        loaderOptions: {
            css: {},
            less: {
                // 向全局less样式传入共享的全局变量
                // data: `@import "~assets/less/variables.less";$src: "${process.env.VUE_APP_SRC}";`
            },
            // postcss 设置
            postcss: {
                plugins: [
                    require("postcss-px-to-viewport")({
                        viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
                        viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
                        unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
                        viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
                        selectorBlackList: [".ignore", ".hairlines"], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
                        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
                        mediaQuery: false // 允许在媒体查询中转换`px`
                    })
                ]
            }
        }
    },
    //webpack 链式配置   默认已经配置好了  node_moudles/@vue
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
        // 修复Lazy loading routes  按需加载的问题，如果没有配置按需加载不需要写，会报错
        // config.plugin("html").tap(args => {
        //   args[0].chunksSortMode = "none";
        //   return args;
        // });
        //添加别名
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("layout", resolve("src/Layout"))
            .set("base", resolve("src/base"))
            .set("static", resolve("src/static"));
        // 压缩图片
        config.module
            .rule("images")
            .use("image-webpack-loader")
            .loader("image-webpack-loader")
            .options({
                mozjpeg: { progressive: true, quality: 65 },
                optipng: { enabled: false },
                pngquant: { quality: "65-90", speed: 4 },
                gifsicle: { interlaced: false },
                webp: { quality: 75 }
            });
    },
    //webpack 配置
    configureWebpack: config => {
        const plugins = [];
        //去掉不用的css 多余的css
        plugins.push(
            new PurgecssPlugin({
                paths: glob.sync([path.join(__dirname, "./**/*.vue")]),
                extractors: [
                    {
                        extractor: class Extractor {
                            static extract(content) {
                                const validSection = content.replace(
                                    /<style([\s\S]*?)<\/style>+/gim,
                                    ""
                                );
                                return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
                            }
                        },
                        extensions: ["html", "vue"]
                    }
                ],
                whitelist: ["html", "body"],
                whitelistPatterns: [/el-.*/],
                whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
            })
        );
        //启用代码压缩
        plugins.push(
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: false,
                        pure_funcs: ["console.log"] //移除console
                    }
                },
                sourceMap: false,
                parallel: true
            })
        ),
            //代码压缩打包
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        config.plugins = [...config.plugins, ...plugins];
    },
    parallel: require("os").cpus().length > 1,
    pluginOptions: {},
    pwa: {},
    //设置代理
 /*   devServer: {
        port: 8080,
        host: "0.0.0.0",
        https: false,
        open: true,
        openPage: "about",
        hot: true,
        disableHostCheck: true,
        proxy: {
            "/api": {
                target: "https://cdn.awenliang.cn",
                ws: true,
                changeOrigin: true
            },
            "/foo": {
                target: "https://cdn.awenliang.cn",
                ws: true,
                changeOrigin: true
            }
        }
    }*/
};