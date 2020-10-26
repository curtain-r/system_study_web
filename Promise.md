## Promise

> JS 是单线程，当执行到异步操作的时候就将他们存放在异步操作队列，等同步操作全部完成继续轮番遍历异步操作队列

<h3 id="01">在Promise之前的异步操作(套娃操作)</h3>

可以看不懂，因为~~~自己看了都头大

```javascript
function notice(msg, then) {
    then(msg);
}
function meal() {
    notice("开始做饭", msg => {
        console.log(msg);
        notice("做好了",msg => {
            console.log(msg);
            setTimeout(() => {
                notice("吃了几口，挺好吃",msg => {
                    console.log(msg);
                    setTimeout(() => {
                        notice("吃完了，再来亿碗", msg => {
                            console.log("没钱了，算了吧");
                        });
                    }, 2000);
                });
            },50000);
        });
    });
}
meal()
```

> 你就看看，这小括号大括号，还能找到`setTimeout()`的等待时间往哪加吗？？，这才几层嵌套啊？？再来看看`Promise`

```javascript
let p1 = new Promise((resolve, reject) => {
    console.log("开始做饭");
    resolve("做好了")；
})
.then(
msg => {
    console.log(msg);
    return {
        then(resolve) {
            setTimeout(()=>{
                resolve("吃了几口，挺好吃")；
            },2000)
        }
    }
})
.then(
	msg => {
        console.log(msg);
        setTimeout(() => {
            resolve("吃完了，再来亿碗");
        }, 50000)
    }
)
.then(
	msg => {
        console.log("没钱了，算了把");
    }
)
```

> 不说其他的，就看排版，比传统方式好看多了，如果在多几层嵌套，传统方法简直搞人心态

**那么快乐的学习Promise吧**

<h3 id='02'>Promise的状态</h3>

Promise有三个状态`pending  fulfilled  rejected`

* `pending`初始等待状态，初始化Promise的状态
* `resolve`已解决，`pending -> fulfilled`
* `rejected`已拒绝，`pending -> rejected`
* 状态的改变不可逆转，只能改变一次

**当我们初始化一个Promise而不执行操作时，状态不会发生改变，还是初始化时的`pending`，随操作改变**

```javascript
console.log(
	new Promise((resolve, reject) => {
	});
)				// Promise {<pending>}
// resolve
console.log(
	new Promise((resolve, reject) => {
        resolve('ok');
    })
)				// Promise {<fulfilled>: 'ok'}
// reject
console.log(
	new Promise((resolve, reject) => {
        reject('reject');
    })
)				// Promise {<rejected>: 'reject'}
```

<h3 id="03">then</h3>

<hr/>

一个promise 需要提供一个then方法访问promise 结果，`then` 用于定义当 `promise` 状态发生改变时的处理，即`promise`处理异步操作，`then` 用于结果。

* then 方法必须返回Promise，用户返回或系统返回
* 第一个参数为`resolved(fulfilled)`状态时执行，必须传，不想处理就传`null`
* 第二个参数为`rejected`状态时执行，可以不传
* `then`的`then`会接受前一个`then`传递的结果(因为then可以链式使用)

```javascript
const promise = new Promise((resolve, reject) => {
    resolve('ok');		// 注意，resolve,reject只能传一个值给then(多个就用数组)
}).then(
	value => {
        console.log(value);		// ok
    },
    error => {
        console.log(error);		// 前面的promise为reject时才会执行
    }
)；
```

**处理结果不可以不背处理，向下传递**

```javascript
const promise = new Promise((resolve, reject) => {
    reject('有问题');			// 这里出问题了
}).then()			// 但是这个then什么都没干
.then(
	value => {
        console.log(value);		
    },
    error => {
    	console.log(error);		// 有问题
    }
    
)
```

> 当resolve没有被处理时，同样也会向下传递，还有一种处理错误的办法就是在最后添加`.catch`来收集处理错误，但是只能处理错误(后面说)

**then的链式调用**

每次的`then`都是一个全新的`Promise`，默认then的返回状态是fulfilled

```javascript
new Promise((resolve, reject) => {
	reject();
})
.then(
    // 我只看我前面的Promise，它是reject,所以我执行reject
	resolve => console.log("fulfilled"),
    reject => console.log("rejected")
)
.then(
	// 我只看我前面的Promise(then返回一个新的Promise),它默认是fulfilled,所以我执行resolve
    resolve => console.log('fulfilled'),
    reject => console.log('rejected')
    
)
// 输出
rejected
fulfilled
```

当then内部返回Promise时，默认值不再使用了，根据返回的Promise状态决定下一个then执行什么操作

```javascript
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
```

<h3>catch处理错误</h3>

catch用于处理失败状态，等同于`then(null, reject){}`

* 建议使用`catch`来处理错误
* 将`catch`放在最后用于统一处理错误，它可以捕获到所有`Promise`错误

```javascript
new Promise((resolve, reject) => {
    reject(new Error('失败了'));
})
.then(()=>{})
.catch(error => {
    console.log(error);		// 失败了
})
```

**catch还可以捕获到，then方法抛出的错误**

```javascript
new Promise((resolve, reject) => {
    throw new Error('fail');
}).catch(msg => {
    console.log(msg.toString());		// fail
})
```

<h3>finally</h3>

无论是`resolved`还是`reject`都会执行此动作，与状态无关

```javascript
const promise = new Promise((resolve, reject) => {
    reject('x');
})
.then(msg => {
    console.log('resolve');
})
.catch(msg => {
    console.log('reject');
})
.finally(() => {
    console.log('不管怎样，我都会执行');
});
```

> 不常用，我们可以在Promise执行完毕之后直接输出

<h3>封装一下ajax</h3>

```javascript
function ajax(url) {
	return new Promise((resolve, reject) => {
        let xhr = XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.onload = function() {
            if (this.status == 200) {
                resolve(JSON.parse(this.response));
            } else {
                reject(this);
            }
        };
    });
}

ajax("https://xxx.")
.then(res => {
    console.log(res);
})
```

<h3>简单实现一下Promise</h3>

```javascript
function Mypromise(callback) {
    // 记录状态
    this.status = 'pending';
    // 存储回调函数
    this.successArr = [];
    this.failArr = [];
    // 定义函数
    let resolve = (value) => {
        // 改变状态
        this.status = 'fulfilled';
        // 执行回调
        this.successArr.forEach(fn => {
            // 保存更新后的value
            value = fn(value)
        });
        // 清空事件列表
        this.successArr = [];
        this.value = value;
    };
    let reject = (value) => {
        this.status = 'rejected';
        this.failArr.forEach(fn=>vale=fn(value));
        this.failArr = [];
        this.value = value;
    }
    // 执行回调
    try {
        callback(resolve, reject)
    } catch(e) {
        reject(e)
    }
}
Mypromise.prototype.then = function(success, fail) {
    // 先看状态
    if (this.status == 'pending') {
        success && this.successArr.push(success);
        fail && this.failArr.push(fail)
    } else if (this.status === 'fufilled') {
        success && success(this.value);
    } else {
        fail && fail(this.value);
    }
    return this;
}


let p = new Mypromise((resolve, rject) => {
    setTimeout(() => {
        resolve('ok')
    },1000);
})
console.log(p);
p.then((...args) => {
    console.log('sucess',args);
    return 200;
},
    (...args) => {
        console.log('fial', args);
    })
p.then().then()
.then(
    (...args) => {
        console.log('two',args);
    }
)
```

> 简单实现，具体实现大家可以去找Promise源码看看，不过要是面试问这样的问题的话，写成这样就OK了⑧