let Promise = require('./promise.js')
let p = new Promise((resolve,reject)=>{
  resolve(new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(100)
    },1000)
  }))
}).then(data=>{
  console.log(data)
}).catch(err =>{
  console.log(err)
})