/**
 * 假如我们已经有一个http服务器，我想集成打包文件的功能
 */

let express = require("express");
let app = express();
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("./webpack.config");
// complier是webpack的编译对象
const complier = webpack(config);
// 这个中间件获取到complier对象后，会根据webpack.config.js配置文件要求开始进行编译，并且可以返回产出的文件
// index.html main.js
app.use(webpackDevMiddleware(complier, {}));
app.listen(3000);
