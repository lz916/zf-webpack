const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = () => {
    return  {
        // console.log(`env=${env}`)
        mode: process.env.NODE_ENV,
        entry: {
            main: './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        },
        devServer: {
            hot: true, //配置热更新，开发环境默认开启了热更新
            // 配置额外的静态文件更目录，不用配置dist，dist本身就是
            // contentBase: path.resolve(__dirname, 'public'),
            compress: true,
            port: 8080,
            open: true, // 启动之后自动打开浏览器
        },
        module: {
            rules: [
                {
                    test: /\.txt$/,
                    use: ['raw-loader']
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'] // 最后一个loader,就是上面最左边的loader一定要返回一个js脚本
                },
                {
                    test: /\.less$/,
                    use: ['style-loader', 'css-loader', 'less-loader'] // 最后一个loader,就是上面最左边的loader一定要返回一个js脚本
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'] // 最后一个loader,就是上面最左边的loader一定要返回一个js脚本
                },
                {
                    test: /\.(jpg|png|bmp|gif|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: `[hash:10].[ext]`,
                                esModule: false,
                                limit: 4 * 1024
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new DefinePlugin({
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            })
        ]
    }
}
   

