//直接将异步的node方法转化成pormise方法
let fs = require('fs')
var {promisify} = require('util')
// let util = require('util')
// let promisify = util.promisify
function promisify(fn){//fn 就是fs.readFile
  return function(...args){//返回一个函数 readfile
    return new Promise((resolve,reject)=>{
      //fs.readFile('./name.txt','utf8')
      fn(...args,function(err,data){//node异步方法 ，err永远在第一个
        if(err) reject(err)
        resolve(data)
      })
    })
  }
}
let readFile = promisify(fs.readFile)

readFile('./name.txt','utf8').then(data=>{
  return readFile(data,'utf8')
}).then(data=>{
  console.log(data)
}).catch(err =>{
  console.log(err)
})
