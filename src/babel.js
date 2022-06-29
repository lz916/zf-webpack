let core = require("@babel/core"); // 核心库，提供了语法树的生成和遍历的功能
let types = require("babel-types"); // 工具类，可能帮我们生成相应的节点
let ArrowFunctions = require("babel-plugin-transform-es2015-arrow-functions");
let es6Code = `
    const sum = (a, b) => {
        return a + b
    }
`;
let targetCode = core.transform(es6Code, {
  plugins: [ArrowFunctions],
});

console.log(targetCode.code);
