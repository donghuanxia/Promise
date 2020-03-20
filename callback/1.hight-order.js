//什么叫高阶函数：1.如果一个函数的参数是一个函数（回调函数也是一个高阶函数）
//2、如果一个函数返回一个函数，这个函数就叫高阶函数

//1)typeof 无法辨别对象类型  2) constructor 谁构造出来的 
//3) instanceof 判断谁是谁的实例__proto__
//4)Objec.prototype.toString.call

function isType(type){
  //将type穿过来的 String，Number 保存在了这个代码块中
  return function(content){
    //为了改变this的指向
    return Object.prototype.toString.call(content) ===`[object ${type}]`
  } 
}
  
//高阶函数实现了第一个功能，保存变量（闭包）
//什么叫闭包：在定义的时候，函数就决定了 一个函数不在自己的所在作用域下执行，拿到外面执行
// let isString = isType('String')
// let isNumber = isType('Number')
// console.log(isString('hello'))
// console.log(isNumber(123))

let util ={}
let arr = ['String','Number']
arr.forEach((type)=> {
  util[`is${type}`] = isType(type)
  console.log('is'+type)
  console.log(`is${type}`)

})
console.log(util.isNumber(1234))
console.log(util.isString('123456'))

//函数的柯里化和函数的反柯里化
//柯里化：柯里化，英语：Currying(果然是满满的英译中的既视感)，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
//反柯里化：//范围扩大
