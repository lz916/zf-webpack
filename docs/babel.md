### babel
babel能够转译`ECMAScript 2015+`,使它在旧的浏览器或者环境中也能远行
工作过程分为三部分
* Parse将源码转换成抽象语法树，树上有很多estree节点
* Transform对语法树进行转换
* generate将上一步经过转换过的抽象语法树生成新的代码