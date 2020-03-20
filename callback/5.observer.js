//观察者模式 观察者和被观察者 是有关联的 观察者需要将自己放到被观察的者之上，放被观察者状态发生变化，需要通知所有的观察者


//我家有只，观察他饿不饿
class Subject{//被观察者
  constructor(name){
    this.name = name
    this.state = '不饿'
    this.observers = []
  }
  attach(o){//需要将观察者注册到自己的身上
    this.observers.push(o)
  }
  setState(state){
    this.state = state
    this.observers.forEach(o =>{
      o.update(this)
    })
  }
}
class Observer{//观察者
  constructor(name){
    this.name = name
  }
  update(catObj){// 等会儿被观察者的状态变化会调用这个方法
    console.log(this.name+':'+catObj.name+'当前的状态是'+catObj.state)
  }
}
let cat = new Subject('猫咪');
let mother = new Observer('我')
let pather = new Observer('粑粑粑')
cat.attach(mother)
cat.attach(pather)
cat.setState('饿了')
cat.setState('吃饱了')