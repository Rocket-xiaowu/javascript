// 1.symbol数据类型:表示独一无二的值
// 特点：值唯一，不能运算，不能使用for in遍历

let s1 = Symbol('你好啊')
let s2 = Symbol('你好啊')
let s3 = Symbol.for('你好啊')
let s4 = Symbol.for('你好啊')
console.log(s1 === s2)//false
console.log(s3 === s4)//true

// 用于给对象添加属性和方法，表示独一无二
let game = {
  name: '俄罗斯方块'
}

let method = {
  up: Symbol(),
  down: Symbol
}

// 往game中添加方法
game[method.up] = () => console.log('我是up')
game[method.down] = () => console.log('我是dowm')

console.log(game)


// 迭代器：iterator，是一种接口，部署了iterator接口的数据可以完成遍历操作，可以使用for ... of循环遍历
const xiyou = ['唐僧', '孙悟空', '猪八戒', '沙僧']

for (let v of xiyou) {
  console.log(v)
}

// 例子
const banji = {
  name: '一班',
  stus: ['唐僧', '孙悟空', '猪八戒', '沙僧'],

  [Symbol.iterator]() {
    // 索引变量
    let index = 0
    let _this = this
    return {
      next: function () {
        if (index < _this.stus.length) {
          const result = { value: _this.stus[index], done: false }
          // 下标自增
          index++
          // 返回结果
          return result
        }
        return { value: undefined, done: true }
      }
    }
  }
}
// 遍历对象
for (let v of banji) {
  console.log(v)
}


// 生成器：本质是一个特殊的函数，用于异步变成
function* generator(arg) {
  // yield是用来分割代码的执行,其后是迭代器返回的对象中的value值，生成器返回的是一个迭代器
  console.log(arg)
  yield '百'
  yield '日'
  yield '维'
  yield '新'
}

let gen = generator('AAA')
console.log(gen.next())
// next传入的参数作为上一次调用的yield的返回值
console.log(gen.next('我是第二次调用'))
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())

// for(let v of generator()){
//   console.log(v)
// }



// set集合
// 传入可迭代数据，比如数组，会自动去重
let s = new Set([1, 2, 3, 1, 2])
console.log(s, typeof s) //{1, 2, 3} 'object'

console.log(s.size) // 3
s.add(666)
s.delete(666)
//检测是否包含
s.has('666')// 返回false
// 清空
s.clear()



// Map:新的数据结构，有键有值，类似对象,但是对象的键只能是字符串，Map的键可以是任何值，可以是对象
let m = new Map()
m.set('name', '张三')
m.set({ name: '张三' }, '男')
console.log(m, m.size)
console.log(m.get('name'))



// class类

// es5的构造函数实现实例化对象
/* function Phone(brand, price) {
  this.brand = brand
  this.price = price
}
Phone.prototype.call = function () {
  console.log('我可以打电话')
} */

/* // 构造函数的子类继承
function smartPhone(size) {
  // 获取父构造函数的属性
  Phone.call(this, brand, price)

  // 设置子类独有的属性
  this.size = size
}
// 设置子类的原型
smartPhone.prototype = new Phone
smartPhone.prototype.constructor = smartPhone */


// es6的class类
class Phone {
  // 静态的属性和方法属于类，而不属于实例
  // 构造函数外通过 . 添加的属性和方法就是静态的，只属于构造函数，不属于实例对象
  static name = '手机'
  constructor(brand, price) {
    this.brand = brand
    this.price = price
  }
  call() {
    console.log('我可以打电话')
  }
  get g(){
    return this.name
  }
  set g(newvalue){
    this.name=newvalue
  }
}
// class的继承
class smartPhone extends Phone {
  constructor(size) {
    super(brand, price)
    this.size = size
  }
}
const p = new Phone('华为', 3999)
console.log(p)
p.call()
p.g='no'
console.log(p.g)


// ES7
// 1.Array.includes
const books=['西游记','三国演义','红楼梦','水浒传']
console.log(books.includes('三国演义'))
// 2.幂运算 ** 等价于Math.pow()
console.log(2**10)


// ES8
// 主要是async和await
// 对象方法的拓展
const person={
  name:'Rocket',
  age:20
}
// 获取对象的所有键
console.log(Object.keys(person))
// 获取对象的所有值
console.log(Object.values(person))
// 将对象返回为数组，数组0单元是键，1单元是值
console.log(Object.entries(person))
// 获取对象的属性描述对象
console.log(Object.getOwnPropertyDescriptors(person))



// ES9
// ES6的拓展运算符和Rest参数只是针对数组，ES9为对象提供了一样的Rest参数和拓展运算符
function connect({...user}){
  user={...user,size:18}
  console.log(user)
}
connect(person)
// 正则拓展-命名捕获
let str='<a href="http://www.baidu.com">Rocket</a>'
const reg=/<a href="(?<url>.*)">(?<text>.*)<\/a>/
console.log(reg.exec(str))



// ES10
// trimstart,trimend
// flat，flatMap
const arr1=[1,2,3,[4,5,6]]
const arr2=[1,2,[3,4,[5,6]]]
// flat将多维数组转为低维数组,参数是深度，默认是1
console.log(arr1.flat()) //[1, 2, 3, 4, 5, 6]
console.log(arr2.flat()) //[1, 2, 3,4,[5,6]]
console.log(arr2.flat(2)) //[1, 2, 3, 4, 5, 6]
// flatMap,是flat和map的结合，如果map返回的是多维数组，则进行降维
console.log(arr1.map(item=>item*10))



// ES11
// 引入了class的private，可简写为#变量名
// 可选链操作符 ?.
const obj={
  ldh:{
    name:'刘德华',
    age:60
  },
  zxy:{
   name:'张学友',
   age:50 
  }
}
console.log(obj?.ldh?.name)
// 引入了bigint大整型数据类型，只需在数字后面加上n
// 注意：bigint不能直接和普通整数做运算
const n=123n
let n1=123
BigInt(n1)
console.log(n1,typeof n)