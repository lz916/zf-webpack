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

* 生成.map文件
* 包含行和列的信息
* 在目标文件里建立关联，从而能提示源文件原始位置


