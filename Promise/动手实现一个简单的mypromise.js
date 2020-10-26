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