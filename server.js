let http = require("http");

http
  .createServer(function (req, res) {
    debugger;
    const url = req.url;
    console.log("hhaha");
    console.log(url);
    if (url === "/user") {
      res.end(
        JSON.stringify([
          {
            name: "zhufeng",
            age: 12,
          },
        ])
      );
    } else {
      res.end("Not Found");
    }
  })
  .listen(3000);
