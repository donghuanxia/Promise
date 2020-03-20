//promise可以解决链式调用的问题，then.then
let promise = new Promise((resolve,reject) =>{
  resolve('失败率')//普通值意味着不是一个promise
  //throw new Error('失败了')
})
promise.then(data=>{
  return data//then 方法中可以返回一个普通值（不是promise,会把这个结果放到下一个then的成功的回调中
}).then(data =>{
  return new Promise((resolve,reject) =>{//如果返回的是一个promise 那么会采用这个promise的结果
    setTimeout(() =>{
      resolve('hello')
      //throw new Error('失败了')
    })
  })
}).then(data =>{
  console.log(data)
}).then(data =>{
  return new Promise((resolve,reject) =>{
      reject('this is error')
    })
}).then(()=>{

},err =>{
  console.log('error，失败里返回的值，在下层接收到的undefined,是一个普通值，会走下层的成功的回调');//失败返回的undefined ，也是普通值，如果在失败的函数中返回的普通值或者是成功的promise也会走到外层的promise的成功中
  //return undefined
}).then((data)=>{
  console.log(data)//上层返回的undefined
  throw new Error('抛出一个错，走下层的失败')

}).then(()=>{}).catch(err=>{//捕获错误，先找距离自己最近的err ,如果没有错误抓捕，会找到最终的catch方法
  console.log('catch',err)
}).then(data=>{
  console.log(data)
  console.log('success')
},err=>{
  console.log(err)
})
//什么时候走下层成功：1）在then 中返回的是一个普通值(then 或者 err中返回的普通值)， 这些返回的都是普通值  2）返回的是一个promise 函数（返回的是成功的）
//什么时候走下层的失败：1）返回的是一个promise函数（返回的是失败的）2）是一个抛出的错误 throw new Error('xxxxxx')

//catch 的特点死如果都没有写错误处理（一层层找）会找到catch ，catch 也是一个then,catch完还可以写then

