let Pormise1 = require('./promise')
console.log(Pormise1)
let promise = new Promise((resolve,reject) =>{
  //reject('error')
  setTimeout(() => {
    resolve('成功了')
  },1000)
  // /throw new Error('抛出异常')//这种情况，只会执行reject ,不执行 throw new Error('抛出异常')
})
promise.then((data) =>{
  console.log(data)
}).catch((err) =>{
  console.log(err)
})

