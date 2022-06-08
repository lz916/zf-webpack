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


