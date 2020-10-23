// // let name = Symbol('xxx');
// // let obj = {
// //     [name]: 'you name', 	// 把名字保护起来
// //     age: 18
// // }
// // // for/in 遍历
// // for (let key in obj) {
// //     console.log(key);	// age; 不会输出name;
// // }
// // // Object.getOwnPropertySymbols()获取所有Symbol属性
// // for(const key of Object.getOwnPropertySymbols(obj)) {
// // 	console.log(key);	// Symbol(xxx)
// // }
// // // Reflect.ownKeys()获取所有属性
// // for(const key of Reflect.ownKeys(obj)) {
// //     console.log(key);
// // }

// // Set
// // const test = new Set([1,2,3,4]);
// // console.log(test.values());
// // console.log(test.keys());
// // console.log(test.entries());

// // forEach
// // let test = new Set([1,2,3,4]);
// // test.forEach((item,key)=>{console.log(item,key)});

// // // for/of
// // for (const item of test) {
// //     console.log(item);
// // }

// // WeakSet的垃圾回收机制
// const hd = new WeakSet();
// let arr = ["hdcms"];
// hd.add(arr);
// console.log(hd.has(arr));

// arr = null;
// console.log(hd); //WeakSet {Array(1)}

// setTimeout(() => {
//   console.log(hd); //WeakSet {}
// }, 1000);

// // Map
// let m = new Map([
//     ['zs','张三'],
//     ['ls','李四']
// ]);
// console.log(m.get('zs'));

// let map = new Map();
// let obj = {
//     name: '张三'
// };
// map.set(obj,'zs').set('name','ls');			// set的链式操作添加两个元素
// console.log(map.entries());

// // 深造函数
// // 不常用的Function实例创建函数
// let fun = new Function("title","console.log(title)");
// fun('zs');	// zs

// // 标准语法
// function func(title) {
//     console.log(title);
// };
// func('ls');	// ls

// let user = {
//     name: 'zs',
//     getName: function (name) {
//         return this.name;
//     },
//     // 简写
//     setName(value) {
//         this.name = value;
//     }
// }
// // user.setName('ls');
// // console.log(user.getName());	// ls

// // function test() {
// //     console.log('hhh');
// // };
// // window.test();	// hhh

// // let letTest = function() {
// //     console.log('let声明');
// // }
// // window.letTest();	// window.letTest is not a function

// console.log(test(3));		// 4
// // 标准声明
// function test(num) {
// 	return ++num;
// }
// var test = function(num) {
//     return --num;
// }

// "use strict";
// (function () {
//     var name = 'zs';
// })();
// console.log(name); //web is not defined

// {
//     let name = 'ls';
// }
// // console.log(name);	// name is not defined

// 变量提升
console.log(name);	// undefined
var name = 'zs';

// 函数提升
console.log(test(2));	// 3
function test(num) {
    return ++num;
}
// 赋值函数不会提升
var test = function (num) {
    console.log(--num);
};
function sum(...args) {
    return args.reduce((a,b) => {
        return a + b;
    })
}
console.log(sum(1,2,3,4)); 	// 10

function add(...args) {
    console.log(args);
    // return args.reduce((a,b) => a+b);
}
console.log(sum(1,2,3,4)); 	// 10

function arg () {
    console.log(Array.prototype.slice.call(arguments,1));
    console.log([...arguments].slice(1));
    console.log([...arguments].reduce((a,b) => a+b));
}
arg(1,2,3,4);

// 去除数组中的假值
function bouncer(arr) {
    // Don't show a false ID to this bouncer.
    return arr.filter((v,i,arr) => {
      return v != false;
    });
  }
  
  console.log(bouncer([7, "ate", "", false, 9]));

  // 继承
  function Animal() {};
  Animal.prototype.eat = function() {
      console.log(eat);
  };
  function Bird() { };
  Bird.prototype = Object.create(Animal.prototype);// 将Animal原型作为Bird的原型
  Bird.prototype.constructor = Bird;    // 然后把自身构造器给到自己的原型上去

  // 范围内数字求和
  function sumAll(arr) {
    arr.sort((a,b) => a-b);
    let res = 0;
    for(let i=arr[0];i<=arr[1];i++) {
      res += i;
    };
    return res;
  }
  
  console.log(sumAll([5, 10]));