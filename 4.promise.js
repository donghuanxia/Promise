
let promise11 = new Promise((resolve,reject)=>{
  resolve('100')
})
let promise22 = promise11.then(()=>{
  return promise22
})
promise22.then(data=>{console.log('success',data)},err=>{console.log('error',err)})