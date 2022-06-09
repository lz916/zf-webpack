const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = () => {
  return {
    // console.log(`env=${env}`)
    mode: process.env.NODE_ENV,
    entry: {
      main: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
    },
    devServer: {
      hot: true, //配置热更新，开发环境默认开启了热更新
      // 配置额外的静态文件更目录，不用配置dist，dist本身就是
      // contentBase: path.resolve(__dirname, 'public'),
      //   contentBase: path.resolve(__dirname, "public"),
      compress: true,
      port: 8080,
      open: true, // 启动之后自动打开浏览器
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
              presets: ["@babel/preset-env"],
              plugins: [
                ["@babel/plugin-perposal-decorators", { legacy: true }],
                ["@babel/plugin-perposal-class-properties", {loose: true}]
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new DefinePlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  };
};
