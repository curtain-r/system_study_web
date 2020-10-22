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
let test = new Set([1,2,3,4]);
test.forEach((item,key)=>{console.log(item,key)});

// for/of
for (const item of test) {
    console.log(item);
}