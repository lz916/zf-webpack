// const title = require('./title')
// const content = require('./content.txt')
// console.log(title)
// console.log(content)
console.log(`mode里面的process.env.NODE_ENV, ${process.env.NODE_ENV}`)
console.log(`DefinePlugin里面的NODE_ENV, ${NODE_ENV}`)

// import './index.css'

const imgSrc = require('./images/img.png')
console.log(imgSrc)
const img = new Image()
img.src = imgSrc
document.body.appendChild(img)