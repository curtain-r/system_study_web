<h2>CSS单位</h2>

* %：百分比单位，相对于父元素
* px：像素单位，表示屏幕上的一个点
* in：英寸单位，像素与英寸的转换与分辨率有关
* cm ：1英寸 = 2.54 cm
* em：与字号相关
* rem：与根元素字号有关(根元素：html)
* vw ：1 vw = 视口宽度的1%
* vh ：1 vh = 视口高度的1%

<h2>BFC(块级格式上下文)</h2>

**布局规则**

* 内部的盒子垂直方向，依次排列
* 存在margin塌陷
* 子盒子左边与父盒子左边互相接触，浮动也是如此
* BFC的区域不会与float重叠
* BFC就是页面上一个隔离的独立容器，容器里面的元素不会影响到外面的元素；
* 计算BFC高度时，浮动元素也参与计算

**产生条件**

1. 根元素
2. float属性不为none
3. overflow部位visible
4. position为absolute或fixed
5. display为inline-block，table-cell，table-caption，flex

<h2>IFC(内联格式上下文)</h2>

**布局规则**

* 元素左右紧挨，会因为float扰乱

* 水平居中：通过text-align：center；可以使水平居中
* 垂直居中：通过vertical-align：middle；可以使垂直居中

