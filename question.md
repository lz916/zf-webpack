### env/process.env.NODE_ENV/DefinePlugin的区别

|配置方式|index.js|webpack.config.js|
|:----|:----|
|package.json中的mode|可以|不可以|
|package.json中的env|不可以|不可以|
|DefinePlugin|可以|不可以|
|cross-env|不行，但是有办法|可以

package.json中的script的 --env给webpack配置文件导出函数时获取到，其他地方获取不到。
package.json中的script的 --mode变量在代码块中使用，webpack的配置文件拿不到，--mode变量的优先级高于配置文件的

一般来说index.html放在自己的服务器上，不开启缓存，方便更新
index.html引用的静态文件，js css要加hash值，存放在cdn上，进行长期缓存

## node-sass是干啥的
sass-loader是吧sass转化成css,靠的就是node-sass

## style-loader的作用
style-loader创建一个style标签，把css挂到html上

```javascript

let style = document.createElement('style')
style.innerHTML = `body{
    background-color: green
}`
document.head.appendChild(style)
```

### file-loader和url-loader的区别
url-loader(内嵌)不是内置了file-loader（拷贝）
url-loader自动依赖了file-loader 不是包含的关系，是依赖关系


### 使用图片有几种方式

* require图片路径
* 可以再css中通过background引入
* 可以在html中引入（这种方式严重不推荐，）直接引用CDN地址或者引入public下面的文件

## 资源模块 
asset webpack新模块


## JS兼容性
* Babel其实是一个编译Javascript的平台，可以把ES6/ES7,React的jsx转义未ES6

### 常见依赖库

* babel-loader 使用webpack和Babel转译Javascript文件
* @babel/core Babel编译的核心
* babel-preset-env
* @babel/preset-reactReact React插件的Babel预设
* @babel/plugin-proposal-decorators 把类和对象装饰器编译成ES5
  
### babel-loader,@babel/core, babel-preset-env的关系
babel-loader是一个函数，负责接收原来的内容返回新的内容，具体的转换工作需要@babel/core来做，@babel/core是一个转换代码的姻亲，但是@babe/core不知道转换规则，转换那些，需要babel-preset-env来设置规则

预设是插件的集合
mal
## eslint

webpack里面 loader有分类的
* pre前置
* normal 正常
* inline 内联
* post 后置

eslint-config-aribnb

## sourceMap

### source-map

* 生成.map文件(不能缓存模块的soruceMap,每次都要重新生成完整的sourcemap，把所有的map存放一个文件，100模块，只要改以恶，整个map就要重建)
* 包含行和列的信息
* 在目标文件里建立关联，从而能提示源文件原始位置

### inline-source-map
* 以base64格式内联再打包后的文件里
* 包含完整的行和列的信息
* 在目标文件里建立关系，从而能提示源文件原始位置
* 不会生成单独的文件

## 相关插件

### 插件有顺序吗
插件里面有钩子， 钩子的执行时间不一样，如果是在同一钩子触发的插件有顺序

* before是在静态资源中间之前，一般用来配置mock数据，或者配置一些中间件
* after是在静态资源中间件之后，一般用来进行一些异常处理，记录一些日志 基本没人用

# hidden-source-map
* 会在外部生成source-map,但在目标文件并没有建立关联，也不能提示原始错误位置
* 上线的代码中不能有source-map,会泄露源代码
* 但是你在线上出bug的时候，需要调试，需要源代码

### eval-soruce-map

* 会为每一个模块生成一个单独的sorucemap进行关联，并使用eval执行（它和sourcmap内容一样，但可以缓存每个模块的sourcemap，在重新构建的时候速度快，每个模块有自己的sourcemap，相互独立）

### nosources-source-map
* 也会在外部涩会给你从sourcemap文件，也能找到源代码的位置，但是源代码的位置是空的

### cheap-source-map
* 轻量级的
* 只包含行映射，不包含列映射
* 不包含babel的map映射，只能看到babel转换后的es5代码

### cheap-module-source-map
* 只包含行映射，不包含列映射
* 包含babel的map的映射，可以看到最原始的React代码


### 最佳实践

#### 开发环境
* 我们在开发环境对sourceMap的要求是：速度快，调试更友好
* 要想速度快 推荐eval-source-map
* 如果向调试更友好 cheap-module-source-map
* 折中选择就是 eval-source-map

#### 生成环境
* 首先排除内联，因为一方面我们要隐藏源代码，另一方面要减少文件体积
* 要想调试友好 sourcemap>cheap-soruce-map
* 要想速度快优先选择cheap
* 折中的选择就是 hidden-source-map

#### 测试环境
* source-map-dev-tool-plugin 实现了对source map生成进行更细颗粒度的控制

## 引入第三方插件

* 直接引入，会打包到main.js里面，使得文件很大
* 插件引入 ProvidePlugin 优点，不需要再每个模块内部引用，但是也会打包输出文件里
* export-loader 可以把模块添到全局对象上，再调试的时候比较有用
    * 还是需要再模块内至少手工引入一次
    * 会把变量挂在全局对象上window._
    * 也需要打包
* externals
    * 通过注入外链CDN

## 生产环境配置
* 文件体积尽可能少
* 尽可能方便缓存
* 指定图片和css目录

### 提取css

* mini-css-extract-plugin 插件 在build用


## Hash

* 工程级别的hash,每修改任何一个文件，所有的文件名都会发生改变，每次webpack构建时生成一个唯一的hash
* chunkHash 会根据不同的入口文件，进行依赖文件解析，构建对应的hash值,来源于同一个chunk,则hash值就一样，
* contentHash 只有文件内容改变了 hash值才变，文件内容相同，hash值就一样, 最可靠 但是性能最差

css-loader内置了importLoader参数
less-loader 内置了@import的处理


## 压缩JS，CSS和HTML

* optimize-css-assets-webpack-plugin 是一个优化和压缩css资源的插件
* terser-webpack-plugin 是一个优化和压缩JS资源的插件
* image-webpack-loader 对图片进行压缩和优化 // 用处不大，一般有专门的压缩工具

webpack5需不需要配optimization？
mode=production css js html默认会自动压缩

安装node_modules 慢
模块从网上下载下来，放在C盘，然后拷贝到当前目录中

## babel-polyfill

* Babel 默认只转换新的Javascript语法，而不转换新的Api，比如Set,Map,Promise等全局对象
* babel-polyfill是通过向全局对象和内置对象的prototype上添加方法实现，比如运行环境中不支持Array.Prototype.find方法，引入polyfill，我们就可以使用es6来编写，但是确定是会造成全局空间污染
* @babel/@babel/preset-env为每一个环境的预设
* @babel/preset-env默认支持语法转化
* useBuiltIns 如果不设置 @babel/preset-env 只转行新的语法，不转行API

### useBuiltIns

  * false：不对polyfill做操作，如果引用了@babel/polyfill，则无视配置的浏览器兼容，应用所有的polyfill
        * 手工引入@babel/polyfill,全量引入@babel/polyfill 不考虑你兼容的浏览器版本， 不考虑配置得brwoserlist
  * entry: 根据配置得浏览器兼容版本，引入浏览器不兼容的polyfill，需要再入口文件里手动添加import @babel/polyfill,会自动根据browserslist替换成浏览器不兼容的所有polyfill
  * usage: 会根据配置的浏览器兼容，以及你代码中用到的API进行polyfill，实现了按需添加，polyfill会自动按需添加，不需要手动引入@babel/polyfill

preset
core-js@2
core-js@3

plugin-transform-runtime
@babel/runtime-corejs2
@babel/runtime-corejs3

helpers 移除内联的babel helpers 并替换为babel/runtime/helpers

如何选择最合适的配置
* babel-runtime 适合在组件和类库中使用 局部引入，不污染全局环境
* babel-polyfill 适合在业务项目中使用 不怕污染全局
* 局部引入优点不污染全局，缺点 不增加文件体积大小
* 全局引入缺点不污染全局，优点不增加文件体积大小

### toStringTag
* Symbol.toStringTag 是一个内置symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来标识该对象的自定义类型标签
* 通常只有内置的Object.prototype.toString()方法会去读取整个标签并把它宝航在自己的返回值里

### 打包的文件分析

```javascript
var modules = {
    './src/title.js': (module) => {
        module.exports = 'title'
    }
}

var cache = {}
function require(moduleId) {
    var cachedModule = cache[moduleId]
    if (cachedModule !== undefined) {
        return cachedModule.exports
    }
    var module = cache[moduleId] = {
        exports: {}
    }
    modules[moduleId](module, module.exports, require)
    return cachedModule.exports
}
```

* 每一个异步引入都会分割这一个js,这也是Vue,React路由懒加载的原理