//什么叫高阶函数“异步”中
//什么叫异步，1）执行后的返回结果不能立马获取 ajax,等待同步代码执行完毕后，才会获取执行结果
// setTimeout(() => {
//   console.log('10000')
// }, 1000);
// while(true){
//   console.log('吃饭了')
// }
//死循环
let fs = require('fs')//node里的读写文件
//异步的解决方案 最早就是基于回调函数的 不能使用 try  catch 来解决异常
//node 中的回调函数的第一个参数 永远是error

//1--------------------------------------
//读取age 和name 用他们的结果作为一个对象
// let renderObj = {}
// fs.readFile('./age.txt','utf-8',function(error,data){
//   console.log(data)
//   renderObj['age'] = data
// })
// fs.readFile('./name.txt','utf-8',function(error,data){
//   console.log(data)
//   renderObj['name'] = data
// })
// console.log(renderObj)//但是这种打印出来的永远是个空对象，因为  console.log(renderObj)是同步执行，readFile的方法是异步的，console.log(renderObj)的执行书序在 readFile的方法之前
//2--------------------------------------------------
// 然后换一种回调的方式
// fs.readFile('./age.txt','utf-8',function(error,data){
//   console.log(data)
//   renderObj['age'] = data
//   fs.readFile('./name.txt','utf-8',function(error,data){
//     console.log(data)
//     renderObj['name'] = data
//   })
// })
//一层嵌套一层，一个执行完再执行另外一个，花费时间就，性能不高， 可读性很差，如有有很多，一直嵌套吗
//回到地狱，恶魔金字塔

//3----------------------------------------------------
//基于回调的方式来获取最终的结果

// let renderObj = {}
// function after(times,callback){
//   return function(){
//     if(--times===0){
//       callback()
//     }
//   }
  
// }
// let  out = after(2,function(){
//   console.log(renderObj)
// })
// fs.readFile('./age.txt','utf-8',function(error,data){
//   console.log(data)
//   renderObj['age'] = data
//   out()
// })
// fs.readFile('./name.txt','utf-8',function(error,data){
//   console.log(data)
//   renderObj['name'] = data
//   out()
// })

//4--------------------------------------------------------
//可以优化下写成这样
function after(times,callback){
  let renderObj = {}
  return function(key,val){
    renderObj[key] = val
    if(--times===0){
      callback(renderObj)
    }
  }
  
}
let  out = after(2,function(renderObj){
  console.log(renderObj)
})
fs.readFile('./age.txt','utf-8',function(error,data){
  out('age',data)
})
fs.readFile('./name.txt','utf-8',function(error,data){
  out('name',data)
})