function Game(snake, map, food, block) {
    this.snake = snake;
    this.map = map;
    this.food = food;
    this.block = block;
    this.init();
}

Game.prototype.init = function() {
    this.map.init();
}