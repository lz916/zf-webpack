// const title = require("./title");
// console.log(title);

document.addEventListener("click", () => {
  import("./title").then((res) => {
    console.log(res.default);
  });
});
