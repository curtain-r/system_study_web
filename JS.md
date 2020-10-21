## 精通JavaScript

### 1. JS加载阻塞

一般地，一个包含外部样式表和外部脚本问价的HTML载入和渲染过程是这样的：

1. 浏览器下载HTML文件并开始解析DOM；
2. 遇到样式表文件时，将其加入资源文件下载列表，继续解析DOM；
3. 遇到脚本文件时，暂停DOM解析并立即下载脚本文件
4. 脚本文件下载好后立即执行，此时脚本只能访问当前已加载的DOM元素；
5. 脚本执行结束，继续解析DOM；
6. DOM解析完成，出发DOMContentLoaded事件。

> 所以阻塞就是DOM还没有解析渲染完毕，由于JS文件的优先下载解析导致页面不能正常显示一段时间，也就是白屏

**解决办法**：

1. 推迟加载（延迟加载）

初始页面如果不依赖与js就可以用推迟加载，将js文件在body的最后引入。

2. defer延迟加载

使用<srcipt src="" defer><script>它会在文档解析完成，DOMContentLoaded事件之前执行完成

3. 异步加载

使用<script type="text/javascript" async></script>，它会异步加载JS不会导致页面阻塞，或者动态创建script标签

```javascript
<script type="text/javascript">
	(function() {
    	let s = document.createElement('script');
    	s.type = 'text/javascript';
    	s.sync = true;
    	s.src = 'xxx.js';
    	let x = document.getElementByTarName('script')[0];
    	x.parentNode.insertBefore(s,x);
	})();
</script>
```

### 2. 变量提升

> 解析器会在执行代码之前，先解析一遍，在解析的过程中如果有`变量的使用在变量的定义之前`，那么解析器就会做一步操作，提升变量

**1. `var`声明的变量提升**

```javascript
// 我们写的代码
console.log(a);		// undefined
var a = 1;
console.log(a);		// 1

// 真正执行的代码(解析器修改后的代码)
var a;
console.log(a);
a = 1;
console.log(a);
```

**2. `if(false)`的变量提升**

```javascript
// 我们写的代码
var user = 'zs';
(function() {
    if(false) var user = 'ls';
    console.log(user);		// undefined
})();
// 解析器处理过后
var user = 'zs';
(function() {
    var user;
    if(false) user = 'ls';
    console.log(user);
})
```

### 3. TDZ(暂存性死区)

​	`var`定义的变量输出在定义之前会输出`undefined`，也就是变量提升；但是`let/const`声明的变量在声明前存在暂存性死区，会报错，也就是说，我们使用`let/const`定义变量必须`先声明后使用`

**1. 声明变量时的TDZ**

```
console.log(x);	// Cannot access 'x' before initialization
let x = 1;
```

**2. 函数中的TDZ**

```javascript
(function work() {
	console.log(user);	// 报错
    let user = 'zs';
})();
```

**3. 函数参数的TDZ**

```javascript
(function work(a=b, b=3) {})();	//Connot access 'b' before initialization
```

> 也就是说，在`b`还不知道是什么的情况下，是无法赋值给`a`的

### 4. 块级作用域以及全局污染

> `let/const/var`他们的共同点是全局作用域中声明的变量，在函数中都能使用

```javascript
// var/let 都一样
let a = 3;
function fun() {
    a = 5;
    console.log(a); 	// 5;	
}
fun();
console.log(a);			// 5
```

> 个人理解是: 在局部使用到一个变量是会先在自己的局部范围内找，如果没有该变量，则再向上一级寻找

**由于`var`没有块级作用域，它声明的变量不限制于自己的局部**

```javascript
var i = 2;
for (var i=0;i<10;i++) {
    
};
console.log(i);
```

