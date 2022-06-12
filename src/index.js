// const title = require('./title')
// const content = require('./content.txt')
// console.log(title)
// console.log(content)
// console.log(`mode里面的process.env.NODE_ENV, ${process.env.NODE_ENV}`);
// console.log(`DefinePlugin里面的NODE_ENV, ${NODE_ENV}`);

// // import './index.css'
// import "./logo.css";
// const imgSrc = require("./images/img.png");
// console.log(imgSrc);
// const img = new Image();
// img.src = imgSrc;
// document.body.appendChild(img);

// function readonly(target, key, descriptor) {
//   descriptor.writable = false;
// }

// class Person {
//   @readonly PI = 3.14;
// }

// let p = new Person();
// // console.log(p);
// p.PI = 3.15;
// // console.log(p);

// import React from "react";
// import ReactDOM from "react-dom";
// ReactDOM.render(<h1>hello</h1>, document.getElementById("root"));

fetch("/api/user").then((res) => {
  console.log(res);
});
// let a = 1;
// let b = 2; console.log(d)
// let c = 4
// debugger
// ReactDOM.render(<h1>hello</h1>, document.getElementById("root"));

// import _ from 'loadsh'
require('loadsh')
console.log(_.join(['a, b, c'], '@'))
