
// 体验一把异步加载
// let a = 1;
// let b = 3;
// console.log(a+b);
// function loadImage(src, resolve, reject) {
//     const image = new Image();
//     image.src = src;
//     image.onload = () => {
//         resolve(image);
//     };
//     image.onerror = () => {
//         reject(new Error('load fail!'));
//     };
//     document.getElementsByTagName('div')[0].appendChild(image);
// }

// loadImage(
//     'img/01.png',
//     image => {
//         image.style.border = "solid 5px red";
//     },
//     error => {
//         console.log(error);
//     }
// );

// 体验一把Promise
// console.log(
//     new Promise((resolve, reject) => {
//         resolve("fulfilled");
//     })
// )

// 看一下执行顺序
// const promise = new Promise(resolve=> resolve("suceess"));
// console.log('同步');
// promise.then(console.log);
// console.log(".then");
// promise.then(()=>{
//     console.log(".then.then");
// });

// resolve传递promise
// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("ok");
//     }, 2000);
// });
// const p2 = new Promise((resolve, reject) => {
//     resolve(p1);
// }).then(
//     msg => {
//         console.log(msg);
//     }
// )

// promise的执行结果必须被处理，不然就传递下去
// let promise = new Promise((resolve, reject) => {
//     resolve('ok');
// });
// let p2 = promise.then();
// p2.then().then(resolve => {
//     console.log(resolve);       // ok
// })

// 如果reject被拒绝执行
// let promise = new Promise((resolve, reject) => {
//     reject('reject');
// });
// let p2 = promise.then(()=>{});
// p2.then(null,null).then(null, reject => {
//     console.log(reject);
// })

// 当then返回一个Promise时
// new Promise((resolve, reject) => {
//     resolve();
//   })
//   .then(v => {
//     return new Promise((resolve, reject) => {
//       resolve("第二个promise");
//     })
//   })
//   .then(value => {
//     console.log(value);
//     return value;
//   })
//   .then(value => {
//     console.log(value);
//   });

//   new Promise((resolve, reject) => {
//     resolve(
//       new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve("解决状态");
//         }, 2000);
//       })
//     );
//   })
//     .then(
//       v => {
//         console.log(`fulfilled: ${v}`);
//         return new Promise((resolve, reject) => {
//           setTimeout(() => {
//             reject("失败状态");
//           }, 2000);
//         });
//       },
//       v => {
//         console.log(`rejected: ${v}`);
//       }
//     )
//     .catch(error => console.log(`rejected: ${error}`));
  
// 当then不是函数
// new Promise((resolve, reject) => {
//     resolve();
// })
// .then(() => {
//     return {
//         // then: 'han'  => {then: 'han'}
//     };
// })
// .then (v => {
//     console.log(v);
// })

// 使用未定义的变量将会触发reject
// new Promise((r,j) => {
// }).then(
//     v => console.log(v),
//     j => console.log(j)
// )

// let promise = new Promise((resolve, reject) => {
//     throw new Error("fail");
//   });
//   let p2 = promise.then();
//   p2.then().then(null, reject => {
//     console.log(reject + ",后盾人");
//   }).catch(reject=>{console.log(reject)})

// new Promise((resolve, reject) => {
//     resolve("success");
//   })
//   .then(msg => {
//     console.log(a);
//   })
//   .catch(reason => {
//     console.log(reason + '123');
//   });

// Promise 封装ajax
// function ajax(url) {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url);
//         xhr.send();
//         xhr.onload = function() {
//             if (this.status == 200) {
//                 resolve(JSON.parse(this.response));
//             } else {
//                 reject(this);
//             }
//         };
//     });
// }

// 图片加载
// function loadImage(file) {
//     return new Promise((resolve, reject) => {
//         const image = new Image();
//         image.src = file;
//         image.onload = () => {
//             resolve(image);
//         };
//         image.onerror = reject;
//         document.getElementsByTagName('div')[0].appendChild(image);
//     });
// }
// loadImage('./img/01.png').then(image=> {
//     image.style.border = "solid 20px black";
//     console.log("宽度:"+window.getComputedStyle(image).width);
// });
new Promise((resolve, reject) => {
    resolve();
})
.then (
	() => {
        return new Promise((resolve,reject) => {
            reject('then返回的Promise出错了');
        })
    }
)
.then(
	resolve => { console.log('ok') },
    error => { console.log(error) }			// then返回的Promise出错了
)