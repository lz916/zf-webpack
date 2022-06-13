const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = () => {
  return {
    // console.log(`env=${env}`)
    mode: process.env.NODE_ENV,
    devtool: "source-map",
    entry: {
      main: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
    },
    watch: true, // 开启监控模式,
    watchOptions: {
      ignored: /node_modules/, // 忽略变化的文件夹,
      aggregateTimeout: 300, // 监听到变化后会等到300s再去执行，其实是一个防抖的优化
      poll: 1000, // 轮询
    },

    devServer: {
      hot: true, //配置热更新，开发环境默认开启了热更新
      // 配置额外的静态文件更目录，不用配置dist，dist本身就是
      // contentBase: path.resolve(__dirname, 'public'),
      //   contentBase: path.resolve(__dirname, "public"),
      compress: true,
      port: 8080,
      open: true, // 启动之后自动打开浏览器
      // before(app) {
      //   // webpack-dev-server 本质上是一个express服务器app
      //   app.get("/api/user", (req, res) => {
      //     res.json([{ name: "name", age: 12 }]);
      //   });
      // },
      // // 中间是处理静态资源
      // after(app) {
      //   app.get("/api/user", (req, res) => {
      //     res.json([{ name: "name12", age: 12 }]);
      //   });
      // },
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          patchRewrite: {
            "^/api": "",
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.txt$/,
          use: ["raw-loader"],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"], // 最后一个loader,就是上面最左边的loader一定要返回一个js脚本
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", "less-loader"], // 最后一个loader,就是上面最左边的loader一定要返回一个js脚本
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"], // 最后一个loader,就是上面最左边的loader一定要返回一个js脚本
        },
        {
          test: /\.(jpg|png|bmp|gif|svg)$/,
          type: "asset/resource", // 相当于原来的file-loader
          //   use: [
          //     {
          //       loader: "url-loader", // 可以把一些肖图片变成base64字符串，内嵌再页面中
          //       options: {
          //         name: `[hash:10].[ext]`,
          //         esModule: false,
          //         limit: 8 * 1024,
          //       },
          //     },
          //   ],
        },
        {
          test: /\.(jpg)$/,
          type: "asset/inline", // 相当于原来的url-loader
          //   use: [
          //     {
          //       loader: "url-loader", // 可以把一些肖图片变成base64字符串，内嵌再页面中
          //       options: {
          //         name: `[hash:10].[ext]`,
          //         esModule: false,
          //         limit: 8 * 1024,
          //       },
          //     },
          //   ],
        },
        {
          test: /\.(html)$/,
          use: ["html-loader"],
        },
        {
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
              ],
            },
          },
        },
        // {
        //   test: /\.jsx?$/,
        //   loader: "eslint-loader",
        //   options: { fix: true },
        //   enforce: "pre",
        //   exclude: /node_modules/,
        // },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new DefinePlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: path.resolve(__dirname, "src/images"),
      //       to: path.resolve(__dirname, "dist/images"),
      //     },
      //   ],
      // }),
      new CleanWebpackPlugin({
        // 打包前把目录清口
        cleanOnceBeforeBuildPatterns: ["**/*"],
      }),
    ],
  };
};
