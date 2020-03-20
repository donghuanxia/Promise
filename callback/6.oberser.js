class Observer{
  constructor(name){
    this.name = name
  }
  update(teacher){
    console.log(teacher.name+'对'+this.name+'说，'+this.name+'的考试'+teacher.state)
  }

}
class Subject{
  constructor(name){
    this.name = name
    this.observers =[]
    this.state = '不及格'
  }
  attach(o){
    this.observers.push(o)
  }
  setState(state){
    this.state = state
    this.observers.forEach(O => {
      O.update(this)
    });
  }
}

let teacher = new Subject('teacher')
let student = new Observer('student')
teacher.attach(student)
teacher.setState('及格了')