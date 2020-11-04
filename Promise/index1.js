// new Promise(resolve=> {
//     document.querySelector('button').addEventListener('click', e=>{
//         resolve();
//     });
// }).then(()=>{
//     return new Promise(resolve => {
//         console.log("正在收藏")
//         setTimeout(() => {
//             console.log("ok");
//             resolve();
//         },2000);
//     });
// }).then(() => {
//     console.log("+100");
// }).catch(error => console.log(error));

function outer() {
    let a = 0;
    return function () {
        console.log(a++);
    }
}

let o1 = outer();
o1();
o1();
let o2 = outer();
o2();
o2();
o2();
o1();