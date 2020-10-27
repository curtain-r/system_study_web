# JS任务管理

`JavaScript`是单线程，也就是说同一个时间只能处理一个任务，为了协调时间、用户交互、脚本、UI渲染和网络等行为，防止主线程阻塞，Event Loop的方案就诞生了

JavaScript 处理任务是在等待、执行、休眠等待中不断循环(Event Loop)



* 主线程任务全部完成，才开始执行队列任务中的任务
* 有新的任务就加入任务队列，采用先进先执行策略

任务包括script(整体代码)  setTimeout  setInterval  DOM渲染  DOM事件  Promise XMLHTTPRequest等

## 理解一下宏任务和微任务

> 宏任务包括同步宏任务和异步宏任务，没必要太死磕概念

```javascript
console.log('同步宏任务，代号001');
setTimeout(function() { console.log("异步宏任务")}, 0);
new Promise(resolve =>{ console.log("Promise是同步宏任务,代号002")})		// 注意了Promise本体是一个同步宏任务
.then(function() {
    console.log(".then是微观任务01");
    resolve();
})
.then(function() {
    console.log(".then是微观任务02");
});
console.log("同步宏任务，代号003");
```

1. 单线程，先走同步宏任务，见到异步任务先放入事件队列(.then是异步微任务)
2. 同步任务执行完毕，再去遍历事件队列的微任务
3. 微任务做完后开始顺序执行异步任务

> 总结一下也就是：同步 -> 微任务 -> 异步任务

```javascript
// 输出
同步宏任务，代号001
Promise是同步宏任务,代号002
同步宏任务，代号003
.then是微观任务01
.then是微观任务02
异步宏任务
```

## 输出问题

> 以下代码输出结果

```javascript
setTimeout (() => {
    console.log("定时器");
    setTimeout(() => {
        console.log("定时器2");
    },0);
    new Promise(resolve => {
        console.log("Promise in timeout");
        resolve();
    }).then(() => {
        console.log("then in timeout");
    });
},0);
new Promise(resolve => {
    console.log("Promise");
    resolve();
}).then(() => {
    console.log('then');
});
console.log('333');
```

