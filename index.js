// let name = Symbol('xxx');
// let obj = {
//     [name]: 'you name', 	// 把名字保护起来
//     age: 18
// }
// // for/in 遍历
// for (let key in obj) {
//     console.log(key);	// age; 不会输出name;
// }
// // Object.getOwnPropertySymbols()获取所有Symbol属性
// for(const key of Object.getOwnPropertySymbols(obj)) {
// 	console.log(key);	// Symbol(xxx)
// }
// // Reflect.ownKeys()获取所有属性
// for(const key of Reflect.ownKeys(obj)) {
//     console.log(key);
// }

// Set
// const test = new Set([1,2,3,4]);
// console.log(test.values());
// console.log(test.keys());
// console.log(test.entries());

// forEach
// let test = new Set([1,2,3,4]);
// test.forEach((item,key)=>{console.log(item,key)});

// // for/of
// for (const item of test) {
//     console.log(item);
// }

// WeakSet的垃圾回收机制
const hd = new WeakSet();
let arr = ["hdcms"];
hd.add(arr);
console.log(hd.has(arr));

arr = null;
console.log(hd); //WeakSet {Array(1)}

setTimeout(() => {
  console.log(hd); //WeakSet {}
}, 1000);

// Map
let m = new Map([
    ['zs','张三'],
    ['ls','李四']
]);
console.log(m.get('zs'));

let map = new Map();
let obj = {
    name: '张三'
};
map.set(obj,'zs').set('name','ls');			// set的链式操作添加两个元素
console.log(map.entries());

// 深造函数
// 不常用的Function实例创建函数
let fun = new Function("title","console.log(title)");
fun('zs');	// zs

// 标准语法
function func(title) {
    console.log(title);
};
func('ls');	// ls

let user = {
    name: 'zs',
    getName: function (name) {
        return this.name;
    },
    // 简写
    setName(value) {
        this.name = value;
    }
}
// user.setName('ls');
// console.log(user.getName());	// ls

// function test() {
//     console.log('hhh');
// };
// window.test();	// hhh

// let letTest = function() {
//     console.log('let声明');
// }
// window.letTest();	// window.letTest is not a function

console.log(test(3));		// 4
// 标准声明
function test(num) {
	return ++num;
}
var test = function(num) {
    return --num;
}

"use strict";
(function () {
    var name = 'zs';
})();
console.log(name); //web is not defined

{
    let name = 'ls';
}
// console.log(name);	// name is not defined