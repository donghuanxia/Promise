//promise https://promisesaplus.com/
//目前低版本浏览器 ie 不支持， 需要polyfill es6-promise (这个包实现了pormise)

//高版本浏览器都支持了pormise

//1、Promise 是一个类，天生的，类中需要传入一个executor 执行器，默认会立即执行
//2、promise 内部会提供两个方法 ，可以更改 promise 的 状态
// pormise 有 3个状态 等待态 PENDING，成功态RESOLVED，失败态REJECTED
// promise 是为了解决异步问题的 ，恶魔金字塔，并发异步处理
// resolve 触发成功（成功的内容） reject 触发失败（失败的内容） undefined
//如果一旦promise 成功了，就不能失败
//如果一旦promiee 失败了，就不能成功了，失败的情况 1)调用了reject 、2)抛出异常

let aa = require('./aa.js')
let Pormise = require('./promise')
let promise = new Promise((resolve,reject) =>{
  //reject('error')
  //resolve('成功了')
  throw new Error('抛出异常')//这种情况，只会执行reject ,不执行 throw new Error('抛出异常')
})
promise.then((data) =>{
  console.log(data)
}).catch((err) =>{
  console.log(err)
})

//有可能别人写的promise是一个函数

// function Promise(){
//   return function(){
      //  返回的是一个函数
//   }
// }
// let p = new Promise()
// console.log(typeof p)