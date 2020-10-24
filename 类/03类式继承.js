function Animal(legs) {this.legs = legs};
Animal.prototype.getLeg = function() {
     return `动物有${this.legs}条腿`;
    };
function Dog(legs) {
    Animal.call(this,legs);
};
// Dog.prototype = Animal.prototype;        // 会出问题
// Dog.prototype = Object.create(Animal.prototype);
Dog.prototype = new Animal();

let dog = new Dog(4);
console.log(dog.getLeg());  // 动物有四条腿；

// 但是当我们有其他需求时(比如Dog的getLeg 要返回"狗有4条腿")
// 此时修改Dog原型方法
Dog.prototype.getLeg = function() {
        return `狗有${this.legs}条腿`;
    };
let animal = new Animal(4);
console.log(animal.getLeg());   //狗有4条腿
console.log(dog.getLeg());      //狗有4条腿

