// 创建一个寄生类
function inherit(child, parent) {
    //1 定义寄生类
    function F() {
        // 4. 修改constructor指向
        this.constructor = child;
    };
    // 2. 让寄生类的原型等于父类的原型
    F.prototype = parent.prototype;
    // 继承静态属性
    for (let key in parent) {
        if (parent.hasOwnProperty(key)) {
            child[key] = parent[key];
        }
    }
    // 3. 将寄生类 的实例赋值给子类原型
    child.prototype = new F();
    return child;
};
function People (name,age) {
    this.name = name;
    this.age  =  age;
};
People.prototype.getName = function() {
    console.log(`我的名字是${this.name}`);
};
function Kid(name,age,sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
};
inherit(Kid,People);	// 寄生式继承

let kid = new Kid('小白',10,'男');

kid.getName();