// var modules = {
//     './src/title.js': (module) => {
//         module.exports = 'title'
//     }
// }

// var cache = {}
// function require(moduleId) {
//     var cachedModule = cache[moduleId]
//     if (cachedModule !== undefined) {
//         return cachedModule.exports
//     }
//     var module = cache[moduleId] = {
//         exports: {}
//     }
//     modules[moduleId](module, module.exports, require)
//     return cachedModule.exports
// }

// 对于我们自己的模块，模块id是相对于更目录的相对路径
var modules = {
  "./src/title.js": (module, exports, require) => {
    module.exports = "title";
  },
};

// 缓存对象，模块加载后会加载到的记过放到缓存对象cache中

let cache = {};
function require(moduleId) {
  var cachedModule = cache[moduleId];
  if (cachedModule !== undefined) {
    return cache[moduleId];
  }
  let module = cache;
  modules[moduleId](module, module.exports, require);
  return module.exports;
}
