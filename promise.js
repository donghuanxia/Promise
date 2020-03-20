//promise https://promisesaplus.com/
//目前低版本浏览器 ie 不支持， 需要polyfill es6-promise (这个包实现了pormise)

//高版本浏览器都支持了pormise

//1、Promise 是一个类，天生的，类中需要传入一个executor 执行器，默认会立即执行
//2、promise 内部会提供两个方法 ，可以更改 promise 的 状态
// pormise 有 3个状态 等待态，成功态，失败态
// promise 是为了解决异步问题的 ，恶魔金字塔，并发异步处理
// resolve 触发成功（成功的内容） reject 触发失败（失败的内容） undefined
//如果一旦promise 成功了，就不能失败
//如果一旦promiee 失败了，就不能成功了，失败的情况 1)调用了reject 、2)抛出异常

//每个promise实例 都要有一个then 方法，分别是成功的回调和失败的回调
function resolvePromise(promise2,x,resolve,reject){
  //此方法为了兼容所有的promise，n个库中间 执行的流程是一样的

  //尽可能的详情不出错
  //1)不能引用同一个对象，可能会造成死循环（自己返回自己死循环）
  if(promise2===x){
    return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  //2)判断x的类型，如果是对象或者函数，说明他有可能是是一个promise（promiseA+中说 promise可以是一个函数或对象）
  let called;
  if((typeof x === 'object'&&x!== null)||typeof
   x === 'function'){
     //有可能是promise promise 要有then方法
     try {
       let then = x.then;//{a:1} 因为then方法 可能使用的getter来定义的
       if(typeof then === 'function'){//只能认为他是promise了
        //call 改变this的指向，并且让函数执行
        then.call(x,y =>{//只取一次 当前promised 解析出来的结果可能还是一个promise 继续解析直到解析到一个普通值为止
          //递归解析resolve的值
          if(called) return
          called = true
          resolvePromise(promise2,y,resolve,reject)
        },r=>{
          if(called) return
          called = true
          reject(r)
        })
       }else{
         //{a:1,then:1}
         resolve(x)
       }
     } catch (e) {//我取了then 出错了，在错误中又调了改promise的成功
       if(called) return
       called = true
       reject(e);//取值失败就走到error中
     }
   }else{//普通值，直接执行
     resolve(x)
   }
}
console.log('dfadfdf')
const PENDING = 'PENDING'//等待
const RESOLVED = 'RESOLVED'//成功
const REJECTED = 'REJECTED'//失败

class Promise{
  constructor(executor){
    this.status = PENDING//默认是等待态
    this.value = undefined//成功的值
    this.reason = undefined//失败的值
    //专门存放失败的回调函数
    this.onResolvedCallbacks = [];
    //专门存放失败的回调函数
    this.onRejectedCallbacks = [];
    let resolve = (value) =>{
      if(value instanceof Promise){
        value.then((value)=>{//递归解析直到是普通值为止
          resolve(value)
        },reject)
        return
      }
      if(this.status === PENDING){//只有在等待的状态才可以改变状态
        this.value = value
        this.status = RESOLVED
        console.log('success')

        //需要让成功的方法一次执行
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = (reason) =>{
      if(this.status === PENDING){//只有在等待的状态才可以改变状态
       
        this.reason = reason
        this.status = REJECTED
        //需要一次让error的方法执行
        this.onRejectedCallbacks.forEach(fn => fn())
      }
      
    }
    //执行executor,传入成功和失败
    try{
      executor(resolve,reject)
    }catch(e){
      console.log('catch',e)//如果内部出错直接将err 手动调用reject方法向下传递
      reject(e)
    }
    
  }
  catch(errCallback){//catch也是一个then方法，只是第一个方法为空
    return this.then(null,errCallback)
  }
  then(onfulfilled,onrejected){
    onfulfilled = typeof onfulfilled === 'function'?onfulfilled:v=>v
    onrejected = typeof onrejected === 'function'?onrejected:err=>{throw err}
    //为了实现链式调用，就创建一个新的promise
    let promise2 = new Promise((resolve,reject)=>{
      if(this.status === RESOLVED){
        //执行then中的方法，可能返回的是一个普通值或者是promise 我要判断x的类型是不是一个promise，如果是promise的话，需要让这个promise执行，并且采用他的状态作为promise的成功或者失败
        setTimeout(()=>{
          try{
            let x = onfulfilled(this.value)
            console.log(x)
            resolvePromise(promise2,x,resolve,reject)
          }catch(e){//一旦方法报错就走到外层then的错误处理中，调用promise2的reject方法
            reject(e)
          }
        },0)
        
      }
      if(this.status === REJECTED){
        setTimeout(() =>{
          try{
            let x =onrejected(this.reason)
            resolvePromise(promise2,x,resolve,reject)
          }catch(e){//一旦方法报错就走到外层then的错误处理中，调用promise2的reject方法
            reject(e)
          }
        },0)
        
      }
      if(this.status === PENDING){
        //这时候excutor肯定是有异步逻辑
        console.log('这是一个等待')
        this.onResolvedCallbacks.push(() =>{
          //TODO....切片编程
          setTimeout(() =>{
            try {
              let x = onfulfilled(this.value)
              resolvePromise(promise2,x,resolve,reject)
            } catch (e) {
              console.log('error',e)
              reject(e)
            }
          },0)
          
        })
        this.onRejectedCallbacks.push(() =>{
          setTimeout(() =>{
            try {
              let x = onrejected(this.reason)
              resolvePromise(promise2,x,resolve,reject)
            } catch (e) {
              reject(e)
            }
          },0)
        })
      }
    })
    
    return promise2
  }
}
let promise33 = new Promise((resolve,reject) =>{
  resolve('成功了')
})
promise33.then(data=>{
  console.log('11111',data)
  return 100
},err=>{
  console.log('22222',err)
})
let promise44 = promise33.then((resolve,reject)=>{
  reject('成功')
})
Promise.defer = Promise.deferred = function(){
  let dfd = {}

  dfd.promise = new Promise((resolve,reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise
//npm install -g promises-aplus-tests//测试 promise.js


