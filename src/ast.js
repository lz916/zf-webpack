let esprima = require("esprima"); // 解析器，可以将源代码转换成抽象语法树AST
let estraverse = require("estraverse"); // 遍历语法树
let escodegen = require("escodegen");
let code = "function ast(){}";
let code1 = "let a = 1";
let ast = esprima.parseModule(code1);
console.log(ast);

// estraverse会以深度优先得方式遍历我们语法对的所有节点，每个节点会有进入和离开两个步骤

let indent = 0; // 缩进的空格
const padding = () => " ".repeat(indent);
// 每个节点总会有进入和离开两个步骤

estraverse.traverse(ast, {
  enter(node) {
    console.log(padding() + node.type + "进入");
    indent += 2;
  },
  leave(node) {
    indent -= 2;
    console.log(padding() + node.type + "离开");
  },
});
