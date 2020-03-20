//对某些函数进行扩展 ，面向切片编程
function say(who,who1){
  console.log(who+'和'+who1+'say')
}

//在说话之前，去刷新
Function.prototype.before = function(callback){//统一扩展了公共方法
  console.log(this)
  //箭头函数中没有 this ，，没有arguments

  //args 就是当前参数的一个数组 ['我']
  //...args剩余数组，当在参数里就是剩余数组
  return (...args) => {//newSay 箭头函数中没有this的指向，会向上级作用域查找
    callback(...args);
    //在方法里应用的时候，就是展开运算符，可以将数组展开依次放入
    this(...args)//调用say方法，this的指向，谁调用这个方法，this 就是谁
  }
}
let newSay = say.before(function(e,m){//高阶函数，因为参数是一个 函数
  console.log('e和m是啥',e,m)
  console.log('刷牙')
})
newSay('我','你')