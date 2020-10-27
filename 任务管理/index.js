console.log('同步宏任务，代号001');
setTimeout(function() { console.log("异步宏任务")}, 0);
new Promise(resolve =>{ resolve();console.log("Promise是同步宏任务,代号002")})		// 注意了Promise本体是一个同步宏任务
.then(function() {
    console.log(".then是微观任务01");
})
.then(function() {
    console.log(".then是微观任务02");
});
console.log("同步宏任务，代号003")