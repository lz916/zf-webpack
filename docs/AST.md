### AST的定义
通过Javascript Parser把代码转为成一颗抽象语法树
### AST的用途
* 代码语法检查，代码风格的检查，代码格式化，代码的高亮，代码错误提示，代码自动补全等等
  * 如JSlint,JSHint对代码错误或风格的检查
  * IDE的错误提示,格式化，高亮，自动补全
* 代码混淆压缩
* 优化变更代码，改变代码结构达到想要的结构
    * 代码打包工具webpack,rollup
    * AMD
    * ts,jsx转成js
### javascript Parser
* 把javascript源码转换为抽象语法树的解析器
* 浏览器会把javascript源码通过解析器转为抽象语法树，再进一步转化为字节码或直接生成机器码
* 每个Javascript引擎都会有自己的抽象语法格式

#### 常见的Javascript Parser
let esprima = require("esprima"); // 解析器，可以将源代码转换成抽象语法树AST
* esprima
* ast exploer
