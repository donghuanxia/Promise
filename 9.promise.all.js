let util = require('util')
let promisify = util.promisify
let fs = require('fs')
let read = promisify(fs.readFile)
//Promise.all 方法 最终返回的是一个promise
//如果全成功了，才算成功，如果一个失败了就失败了
//判断是否为promise
function isPromise(val){
  //promise可以是对象但是不为null，或者是function
  if((typeof val==='object' &&typeof  val!==null)||typeof val==='function'){
    if(typeof val.then === 'function'){
      return true
    }
  }
  return false
}

Promise.all = function(promises){
  let promiseData = []
  return new Promise((resolve,reject)=>{
    
    let arr =[]
    let idx = 0;
    // function processData(index,value){
    //   arr[index] = value
    //   if(++idx === promises.length ){
    //     resolve(arr)
    //   }
    // }
    let processData= (index,value)=>{
      console.log(index,value)
      arr[index] = value
        if(++idx === promises.length ){
          resolve(arr)
        }
    }
    for(let i=0;i<promises.length;i++){
      //判断promises[i]是否是一个promise
      let currentValue = promises[i]
      if(isPromise(currentValue)){
        currentValue.then(y=>{
          processData(i,y)
        },reject)
      }else{
        processData(i,currentValue)
      }
    }
  })
}
function aaa(){
  setTimeout(()=>{
    console.log('aaa')
  },5000)
}
// 异步事件3
function time3() {
  const promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
          resolve("timer3执行完毕")
      }, 3000)
  })
  return promise
}
Promise.all([1,read('./name.txt','utf8'),time3(),2,aaa(),3,read('./age.txt','utf8'),4]).then(data=>{
  console.log(data)
}).catch(err =>[
  console.log(err)
])
//promise.all特地就是让所有的promise并发执行，根据执行的个数判断是否执行完成