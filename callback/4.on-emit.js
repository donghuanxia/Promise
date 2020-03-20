//发布订阅
//发布订阅，都有库中都存在发布订阅 特点是 订阅方和发布方没有任何关系
//观察者模式
let fs = require('fs')
//订阅好一件事，当这件事发生的时候，出发对应的函数
//订阅 on  发布 emit promise 内部也是基于发布订阅的
//
let e ={
  _obj:{},
  _callback:[],
  on(callback){//订阅，就是将函数放到数组中
    this._callback.push(callback)
  },
  emit(key,val){
    this._obj[key] = val
    this._callback.forEach(method =>{//让订阅中的数组依次执行
      console.log('ddd',this._obj)
      method(this._obj)
    })
  }
}
// e.on(function(obj){//每次发布都会出发此函数
//   console.log('执行了几次',obj)
// })

e.on(function(obj){//每次发布都会出发此函数
  if(Object.keys(obj).length===2){
    console.log(obj)
  }
})
e.on(function(obj){//每次发布都会出发此函数
  if(Object.keys(obj).length===2){
    console.log(obj)
  }
})
//让多个类解除耦合
fs.readFile('./age.txt','utf-8',function(error,data){
  e.emit('age',data)
})
fs.readFile('./name.txt','utf-8',function(error,data){
  e.emit('name',data)
})

// console.log(Object.keys({name:'小红',age:10}))
// console.log(Object.values({name:'小红',age:10}))
// console.log(Object.entries({name:'小红',age:10}))