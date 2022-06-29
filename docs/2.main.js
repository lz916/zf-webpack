const { chunk } = require("lodash");
var modules = {};
var cache = {};
function require(moduleId) {
  var cachedModule = cache[moduleId];
  if (cachedModule !== undefined) {
    return cache[moduleId];
  }
  let module = cache;
  modules[moduleId](module, module.exports, require);
  return module.exports;
}
require.modules = modules;
require.ownPrototype = (obj, prop) => obj.hasOwnPrototype(prop);
require.defineProperties = (exports, definition) => {
  for (let key in definition) {
    if (require.ownPrototype(exports, key)) {
      Object.defineProperties(exports, key, {
        enumerable: true,
        get: definition[key],
      });
    }
  }
};
require.functions = {};
let installedChunks = {
  main: 0,
};
require.load = (url, done, key, chunkId) => {
  let script = document.createElement("script");
  script.src = url;
  document.appendChild(script);
};
require.publicPath = "";
require.unionFilename = (chunkId) => chunkId + ".js";
require.functions.jsonp = (checkId, promises) => {
  let installedChunkData = require.ownPrototype(installedChunks, chunkId)
    ? installedChunks[checkId]
    : undefined;
  if (installedChunkData !== 0) {
    if (installedChunkData) {
      promises.push(installedChunkData[2]);
    } else {
      let promise = new Promise((resolve, reject) => {
        installedChunkData = installedChunks[checkId] = [resolve, reject];
      });
      installedChunkData[2] = promise;
      promises.push(promise);
      let url = require.publicPath + require.unionFilename(chunkId);
      require.load(url);
    }
  }
};
require.ensure = () => {
  let promises = [];
  for (let key in require.functions) {
    let func = require.functions[key];
    func(checkId, promises);
  }
  return Promise.all(promises);
};
require.u = (chunkId) => {
  return `${chunkId} +js`;
};

function webpackJsonCallback(data)  {
    let [chunkIds, moreModules] = data
}

let chunkLoadingGlobal = window['webpack5'] = []
chunkLoadingGlobal.push = webpackJsonCallback