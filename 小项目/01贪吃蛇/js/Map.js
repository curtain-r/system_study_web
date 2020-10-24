function Map(row, col, width, height) {
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;
    this.dom = document.createElement('div');
    this.arr = [];
}
Map.prototype.init = function() {
    for (let i=0;i<this.row;i++) {
        let rowDom = document.createElement('div');
        rowDom.className = 'row';
        // rowDom.style.width = this.width/this.col +'px';
        rowDom.style.height = this.height/this.row + 'px';
        let rowArr =[];
        for(let j=0;j<this.col;j++) {
            let colDom = document.createElement('div');
            colDom.className  = 'col';
            rowDom.appendChild(colDom);
            rowArr.push(colDom);
        }
        this.dom.appendChild(rowDom);
        this.arr.push(rowArr);
    }
    this.dom.className = 'box';
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
    document.body.appendChild(this.dom);
}