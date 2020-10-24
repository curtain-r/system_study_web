// 创建类
class Book {
    // 构造函数
    constructor (title, price) {
        // 实例数据(每个实例都会有的特有数据)
        this.title = title;
        this.price = price;
    }
    // 原型方法(每个实例都可以使用的公用方法)
    getTitle() {
        console.log(this.title);
    }
    getPrice() {
        console.log(this.price);
    }
    // 原型属性(添加给自身的属性，自能自己访问)
    set num(val) {
        this._num = val;
    }
    get num() {
        return this._num;
    }
    //  静态数据
    static get write() {
        return 'zzq';
    }
    static getWrite() {
        return this.write;
    }
}
// 外部添加静态数据
Book.msg = 'hello';
Book.getMsg = function() {
    return this.msg;
}
// 实例化
let b1 = new Book('javascript', 59);
let b2 = new Book('面试题', 60);
console.log(b1, b2);
console.log(b1._num)
console.log(Book.write)
// JsBook 继承于 Book
class JsBook extends Book{
    // 可以重写构造函数
    constructor(title, price, score) {
        // 继承父类的部分
        super(title, price);
        // 自己拥有 的部分
        this.score =  score;
    }
}
let jb = new JsBook('js', 60, 100);
console.log(jb);