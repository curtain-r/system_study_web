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

**由于`var`没有块级作用域，它声明的变量不限制于自己的局部，造成的全局污染**

> 块级作用域个人理解：在一对`{}`存在，但出了这里，啥也不是，没人知道，也没人认识

```javascript
var i = 2;
for (var i=0;i<10;i++) {};
console.log(i);		// 10;
```

> 显然这不是我们想要的结果，我们不希望`for`循环里面的`i`影响到我们全局变量`i`;所以我们就使用有块级作用域的`let`来定义变量，就不会造成这样的污染

```javascript
let i = 2;
for (let i=0;i<10;i++) {};
console.log(i);		// 2;
```

**想一想我们所谓的全局不就是`window`对象嘛，它会不会也受到污染**

```javascript
// 先来看结果
var lsj = 'you';
console.log(window.lsj);		// you;
```

> 果然会污染，那当我们定义的变量刚好和`window`中的变量重名，那岂不是出事了

```javascript
var screenLeft = 500;
console.log(window.screenLeft);		// 500
```

> `window.screenLeft`自动获取窗口距离屏幕左边的距离，由于`var`的全局污染，导致它是一个定值了，所以我们应该避免使用`var`

### 5. 严格模式`"use strict"`

> 虽然我们了解到了`let`的好处和`var`的坏处，但是`var`依然是可以声明变量的，这时候使用严格模式就可以避免很多问题

**1. 强制声明防止污染全局之不声明就报错**

```javascript
"use strict";
lsj = 'you';
console.log(lsj);		// lsj is not defined;
```



**2. 关键词不允许作为变量，用就报错**

```javascript
"use strict";
var public = "xxx"; 	// Unexpected strict mode reserved word
```

**3. 参数不允许使用重复参数名，用就报错**

```javascript
"user strict";
function xxx(name, name) {};	//Duplicate parameter name not allowed in this context
```

> 当我们给某个函数使用`"use strict"`时，这个要求会向下传递，也就是说，此函数内部所有内容都使用严格模式，而此函数之外不作要求

### 6. 类型检测

> 类型检测的方法挺多的，我们这之说三种`typeof`,`instanceof`,`Object.prototype.toString()`，首先我们应该清楚他们的使用格式 `typeof,instanceof`是一个操作符，并不是方法，`Object.prototype.toString()`是一个方法，所以用法有点区别

**1. `typeof`检测基本数据类型**

```javascript
typeof xx;		// 使用方法；返回的是一个字符串类型的xx的数据类型
console.log(typeof '123');	// string; 注意返回的其实是"string";
// 所以这个问题我们就需要注意一下啦
console.log(typeof typeof 1); // string;凡是只要大于等于两次嵌套使用typeof的输出都是string;
```

|          代码           |   结果    |
| :---------------------: | :-------: |
|       `typeof 1;`       |  number   |
|     `typeof 'str';`     |  string   |
|     `typeof true;`      |  boolean  |
|      `typeof NaN;`      |  number   |
|   `typeof undefined;`   | undefined |
|     `typeof null;`      |  object   |
| `typeof new Object();`  |  object   |
|  `typeof new Array();`  |  object   |
| `typeof function() {};` |  object   |

> 很明显`typeof `只能判断出基本数据类型(null除外)

**2. `instanceof`：基于原型链的判断**

> 原型和原型链也是JS的一个重点哦（不过先不慌）

```javascript
[] instanceof Array;	// []基于Array类型? 返回值为 true
```

|                   操作                   | 结果 |
| :--------------------------------------: | ---- |
|    `let a = []; a instanceof Array`;     | true |
|    `let a = {};a instanceof Object`;     | true |
|  `let a =()=>{};a instanceof Function;`  | true |
| `let a = new Date(); a instanceof Date;` | true |
|   `let a = /w/g; a instanceof RegExp;`   | ture |

> 这就完了？就这？当然不会，还有一个烦人的事就是，以上的五种类型`instanceof Object`都是`true`，就问你怕不怕？？这个要从原型说起了，
>
> 不着急，我们目前只要大概清楚这些的原型上都有`Object`就行了，好像也说得通，不愧是我

**3. `Object.prototypeo.toString()`高级的方法**

> 这里会涉及`call(),apply()`两个方法，它们两个除了传入的第二个参数有点区别没有其他区别

```javascript
let a = 1;
Object.prototype.toString.call(a);	// [object Number];
a = {};
Object.prototype.toString.apply(a); // [object Object];
```

|          输入           |       输出        |
| :---------------------: | :---------------: |
|      `let a = 1;`       |  [object Number]  |
|    `let a = 'str';`     |  [object String]  |
|   `let a = Symbol();`   |  [object Symbol]  |
| `let a = function(){};` | [object Function] |

> 可以看出不管输入原始数据类型还是引用类型，`Object.prototype.toString()`都可以精准的返回它的类型

### 7. 隐式转换

**基本上所有类型都可以转为`Boolean`类型**

|  数据类型   |        true        |     false      |
| :---------: | :----------------: | :------------: |
|  `String`   |     非空字符串     |      `''`      |
|  `Number`   |      非0数值       |      `0`       |
|   `Array`   | 数组不参与比较时候 | 比较时的空数组 |
|  `Object`   |      所有对象      |                |
| `undefined` |         无         |  `undefined`   |
|   `null`    |         无         |     `null`     |
|    `NaN`    |         无         |     `NaN`      |

```javascript
console.log(‘3’ == true);	// false;  en?不是说好非空字符串转为true嘛？
```

> 往往在我们进行 `==` 比较的时候，两边的类型都要转变为`Number`类型，而在判断时需要转变为`Boolean`.

### 8. 正式学习一下`Symbol`

> `Symbol`用于解决属性名冲突而产生的，`Symbol`值是唯一的，独一无二不会重复的

**1. `symbol`独一无二**

```javascript
let zs = Symbol();
let ls = Symbol();
console.log(zs == ls);	// false;
```

**2. `Symbol`不可以添加属性**

```javascript
let zs = Symbol();
zs.name = 'xxx';
console.log(zs.name);	// undefined;
```

**3. 给`Symbol`添加一个描述**

```javascript
let zs = Symbol('我是张三');
let ls = Symbol('李四');
console.log(zs);		// Symbol(我是张三);
console.log(ls);		// Symbol(李四);
```

> 即使传入相同的描述它依旧是独一无二的，就跟现实生活中两个仅仅名字相同的人的关系一样

**4. `Symbol.for`注册一个"名字"**

```javascript
let zs = Symbol.for('张三');
let ls = Symbol.for('张三');
console.log(zs == ls);	// true;感觉智商在被调戏，说好的独一无二呢？
```

> `Symbol.for('xx')`将`xx`这个描述注册了，这样以后用它描述的`Symbol.for`只能是我，想想其实和现实挺像的，但是不能在用名字来作比较了，身份证可以吧

**5. `Symbol.keyFor`，询问注册描述(身份证号)**

```javascript
let zs = Symbol.for('张三');
console.log(Symbol.keyFor(zs));		// 张三;

let ls = Symbol('李四');
console.log(Symbol.keyFor(ls));		// undefined;
```

**6. 给对象设置`Symbol`属性**

> `Symbol`出现的初衷就是解决属性名重复问题

* `Symbol`声明和访问使用`[]`操作；
* 不能使用 `.` 操作取值

```javascript
let zsName = Symbol('张三');
let obj = {
    [zsName]: 'zhangsan'
};
console.log(obj[zsName]);		// zhangsan;
```

**7. `Symbol`保护机制**

> `for/in for/of `都不能遍历对象中的 `Symbol` 属性，但是使用`Object.getOwnPropertySymbols()` 可以获取所有`Symbol`属性，使用 `Reflect.ownKeys()` 可以获取所有属性

```javascript
let name = Symbol('xxx');
let obj = {
    [name]: 'you name', 	// 把名字保护起来
    age: 18
}
// for/in 遍历
for (let key in obj) {
    console.log(key);	// age; 不会输出name;
}
// Object.getOwnPropertySymbols()获取所有Symbol属性
for(const key of Object.getOwnPropertySymbols(obj)) {
	console.log(key);	// Symbol(xxx)
}
// Reflect.ownKeys()获取所有属性
for(const key of Reflect.ownKeys(obj)) {
    console.log(key);	// age,Symbol(xxx);
}
```

### 9. 非常有趣的`Set`

> 用于储存任何类型的唯一值

* 只能保存值没有键名
* 严格类型检测(1 和 '1'是不同的)
* 值是唯一的
* 遍历顺序是添加顺序，方便保存回调函数

**1. 基本用法**

```javascript
let set = new Set();	// 初始化一个字典,可以传入初始数据(数组或字符串形式)
set.add(1);				// 添加一个内容
set.size;				// 获取字典内容数量
set.has(1);				// 返回true，判断是否存在检测值
set.delete(1);			// 删除一个内容
set.clear();			// 清空
```

**2. 转换为数组**

```javascript
let set = new Set('12345');		// Set {'1','2','3','4','5'}
let set2Arr = [...set];			// ['1','2','3','4','5']
```

**3. 遍历数据**

使用`keys()/values()/entried()`都可以返回可迭代对象，因为`Set`只有`value`，所以返回的`value,key`是一样的

```javascript
const test = new Set([1,2,3,4]);
console.log(test.values());		// [Set Iterator] { 1, 2, 3, 4 }
console.log(test.keys());		// [Set Iterator] { 1, 2, 3, 4 }
console.log(test.entries());	// [Set Iterator] { 1, 2, 3, 4 }	
```

也可以使用`forEach for/of`遍历

```javascript
// forEach
let test = new Set([1,2,3,4]);
test.forEach((item,key)=>{console.log(item,key)});

// for/of
for (const item of test) {
    console.log(item);
}
```

**4. 只能存放对象类型的`WeakSet`**

`WeakSet` 结构同样不会存储重复的值，而且`它的值只能是对象类型`

- 垃圾回收不考虑 `WeakSet`， 即被`WakSet` 引用是引用计数器不加一，所以对象不被引用是不管`WeakSet`是否在使用都将删除
- 因为WeakSet是弱引用，由于其他地方操作成员可能不会存在，所以不可以进`forEach`遍历等操作
- 因为是弱引用，WeakSet结构没有keys(),values(),entried()等方法和size属性
- 因为是弱引用，所以当外部引用删除时，希望自动删除数据使用`WeakMap`

```javascript
const test = new WeakSet();
const child = [1,1];
test.add(arr);		// 添加一个数据
test.delete(arr);	// 删除一个数据
test.has(arr);		// false，检索判断
```

**5. `WeakSet`的垃圾回收**

WeakSet保存的对象不会增加引用计数器，如果一个对象不被引用就会自动删除

* 下例中的数组被引用，计数器+1
* 数据有添加到了test的WeakSet中，引用计数还是1
* 当数组设置为null是，引用计数-1此时对象引用为0
* 当垃圾回收是对象被删除，这是WeakSet也就没有记录了

```javascript
const test = new WeakSet();
let arr = ["ls"];		// 被引用，计数器+1
test.add(arr);			// 数据添加到了test的WeakSet中，引用计数还是1
arr = null;				// 将数组设置为null
console.log(test);		// WeakSet { [items unknown] }

setTimeout(()=>{
    console.log(test);	// WeakSet { [items unknown] }
})
```

### 10. 可以解决不能用对象作键的问题`Map`

Map 是一组键值对的结构，用于解决以往不能用对象作为键的问题

* 具有极快的查找速度
* 函数、对象、基本类型都可以作为键或值

**1. 声明定义**

> 可以接受一个数组作为参数，该数组的成员是一个表示键值对的数组

```javascript
let m = new Map([
    ['zs','张三'],
    ['ls','李四']
]);
console.log(m.get('zs'));		// 张三
```

> 使用set方法添加元素，注意哦是set，之前的是add，支持链式操作

```javascript
let map = new Map();
let obj = {
    name: '张三'
};
map.set(obj,'zs').set('name','ls');			// set的链式操作添加两个元素
console.log(map.entries())		// [Map Iterator] { [ { name: '张三' }, 'zs' ], [ 'name', 'ls' ] }
```



### 11. 深究函数

> 函数就是将复用的代码封装起来

**1. 声明定义**

> 在JS中函数也是对象函数是`Function`类创建的实例，但是标准语法是使用函数声明来定义函数

```javascript
// 不常用的Function实例创建函数
let fun = new Function("title","console.log(title)");
fun('zs');	// zs

// 标准语法
function func(title) {
    console.log(title);
};
func('ls');	// ls
```

> 在对象中，如果我们要书写一个函数属性的话，可以使用它的简写形式

```javascript
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
user.setName('ls');
console.log(user.getName());	// ls
```

我们定义的所有函数都是压入`window`对象中，也就是说全局的外层就是`window`对象，`window`中本来存在一些自己的函数，如果我们写的函数名刚好和`window`对象中的相同，那么原本window中的方法就会无法被正常调用，但是用`let/const`声明的函数不会压入`window`对象中

```javascript
function test() {
    console.log('hhh');
};
window.test();	// hhh

let letTest = function() {
    console.log('let声明');
}
window.letTest();	// window.letTest is not a function
```

**2. 匿名函数**

匿名函数就是指函数本身没有名字，只是将这个函数赋值给了一个变量

```javascript
let test = function(num) {
    return ++num;
};
console.log(hd instanceof Object);	// true

let newTest = test;
console.log(newTest(3));	// 4
```

> 小知识点：如果`let newTest = test();`的话，结果就不一样了哦，不带括号相当于将整个函数赋值给新变量，如果加括号的话就相当于把函数的返回值赋值给新变量

标准声明的优先级高于赋值声明

```javascript
console.log(test(3));		// 4
// 标准声明
function test(num) {
	return ++num;
}
// 赋值声明
var test = function(num) {
    return --num;
};
```

> 而且有同名的标准声明函数之后，不能够在使用`let/const`赋值式声明，只能用`var`

**3. 立即执行函数(函数被定义时立即执行)**

* 可以用来定义私有作用域防止污染全局作用域(前面说过了全局污染哦)

```javascript
"use strict";
(function () {
    var name = 'zs';
})();
console.log(web); //web is not defined
```

* `let/const`有块级作用域，所以只需要一对`{}`就可以将变量放在私有作用域

```javascript
{
    let name = 'ls';
}
console.log(name);	// name is not defined
```

