const fs = require('fs')
const Promise = require('./promise.js')

function read(...args){
  // return new Promise((resove,reject)=>{
  //   fs.readFile(...args,function(err,data){
  //     if(err) reject(err)
  //     resove(data)
  //   })
  // })
  let dfd = Promise.defer();//延迟对象，可以解决promise的嵌套问题
  fs.readFile(...args,function(err,data){
    if(err)  dfd.reject(err)
    dfd.resolve(data)
  })
  return dfd.promise
}
read('./named.txt','utf8').then(data =>{
    return read(data,'utf8')
}).then(data =>{
  console.log(data)
}).catch(err=>{
  console.log(err)
})