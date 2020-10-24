function People (name,age) {
    this.name = name;
    this.age  =  age;
};
People.prototype.getName = function() {
    console.log(`我的名字是${this.name}`);
};
function Kid(name,age,sex) {
    People.call(this,name,age);		// 使用构造函数的方法继承父类自身属性
    this.sex = sex;
};
Kid.prototype = Object.create(People.prototype);	// 原型继承继承父类原型属性
Kid.prototype.constructor = Kid();					// 改变constructor指向

let kid = new Kid('小白',10,'男');
kid.getName();