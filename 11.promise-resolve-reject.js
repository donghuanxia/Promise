let Promise = require('./promise.js')
//Promise.resolve 源码实现
Promise.resolve = function(value){
  return new Promise((resolve,reject)=>{
    resolve(value)
  })
}
//Promise.reject 源码实现
Promise.reject = function(value){
  return new Promise((resolve,reject)=>{
    reject(value)
  })
}
Promise.resolve(new Promise((resolve,reject)=>{
  setTimeout(() =>{
    resolve('3333')
  },1000)
})).then(data=>{
  console.log(data)
})

Promise.reject(new Promise((resolve,reject)=>{
  setTimeout(() =>{
    resolve('333ddd3')
  },1000)
})).catch(err=>{
  console.log(err)
})


Promise.reject(111222).catch(err=>{
  console.log(err)
})

//Promise.resolve和Promise.reject的区别
//1、Promise.resolve是执行成功的，Promise.reject执行的是失败
//2、Promise.resolve这里可以接受一个promise,会把执行的结果赋值，这就有一个等待的效果（例如定时刷新），而Promise.reject 接受一个promise没有实际意义，他会直接赋值，不会等待
