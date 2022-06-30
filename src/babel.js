let core = require("@babel/core"); // 核心库，提供了语法树的生成和遍历的功能
let types = require("babel-types"); // 工具类，可能帮我们生成相应的节点
let ArrowFunctions = require("babel-plugin-transform-es2015-arrow-functions");
let es6Code = `
    const sum = (a, b) => {
        return a + b
    }
`;

// babel插件其实只是一个JS对象，里面会有visitor对象
// 当babel在遍历语法树的时候，会看看有没有插件里的访问器，拦截这个节点
let ArrowFunctionsPlugin2 = {
    visitor: {
        ArrowFunctionExpress(nodePath) {
            let node = nodePath.node
            const thisBinding = hoistFunctionEnvironment(nodePath)
            node.type = 'FunctionExpression'
        }
    }
}

function hoistFunctionEnvironment(fnPath) {
    const thisEnvFn = fnPath.findParent(p => {
        // 是一个函数，不能是箭头函数或者是根节点也可以
        return (p.isFunction() && !p.isArrowFunctionExpression()) || p.isProgram()
    })
    // 找一找当前作用域哪些地方用到了this路径
    const thisPaths = getScopeInfoInformation(fnPath)
    // 声明一个this的别名变量，默认是_this
    let thisBinding = '_this'
}

function getScopeInfoInformation (fnPath) {
    let thisPaths = []
    // 遍历当前path所有的子节点
    fnPath.traverse({
        ThisExpression(thisPath) {
            thisPaths.push(thisPath)
        }
    })
    return thisPaths
}
/**
 * 里面包含的流程
 * 1. 根据源代码生成老的语法树
 * 2. 遍历语法树
 * 3. 遍历的时候要找你注册的插件，找这些插件指定的访问的节点
 * 插件的核心就是把老的语法树转成新的语法树
 * 原则 尽可能少改少动 尽可能复用原来的节点
*/
let targetCode = core.transform(es6Code, {
  plugins: [ArrowFunctions],
});

console.log(targetCode.code);
