# 纯 *CSS* 实现未读消息课堂笔记



## 弹性盒模型



*2009* 年，*W3C* 提出了弹性盒布局方案。弹性盒布局是一种可以简便，完整，响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能了。



弹性盒布局布局已经成为当前布局的首选方案。



**生成弹性容器和弹性项目**

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-27-74520.png" alt="image-20210712104909682" style="zoom: 67%;" />



**更改方向**

通过 *flex-direction* 可更改主轴方向

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-12754.png" alt="image-20210712105533211" style="zoom: 50%;" />

**主轴排列**

通过 *justify-content* 属性，可以影响主轴的排列方式。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-012751.png" alt="image-20210712105623928" style="zoom:50%;" />

**侧轴排列**

通过 *align-items* 属性，可以影响侧轴的排列方式。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-012753.png" alt="image-20210712105712588" style="zoom:50%;" />

## *rem* 单位

平时在做开发时，大家都是使用 *px* 要多一些。

*em* 和 *rem* 相对于 *px* 更具有灵活性，他们是相对长度单位，意思是长度不是定死了的，更适用于响应式布局。

对于 *em* 和 *rem* 的区别一句话概括：***em* 相对于父元素，*rem* 相对于根元素。**



来看关于 *em* 和 *rem* 示例。

*em* 示例

```html
<div>
  我是父元素div
  <p>
    我是子元素p
    <span>我是孙元素span</span>
  </p>
</div>
```

```css
* {
  margin: 0;
  padding: 0;
}

div {
  font-size: 40px;
  width: 10em;
  /* 400px */
  height: 10em;
  outline: solid 1px black;
  margin: 10px;
}

p {
  font-size: 0.5em;
  /* 20px */
  width: 10em;
  /* 200px */
  height: 10em;
  outline: solid 1px red;
}

span {
  font-size: 0.5em;
  width: 10em;
  height: 10em;
  outline: solid 1px blue;
  display: block;
}
```

效果：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-14-075220.png" alt="image-20210914155219732" style="zoom:50%;" />

*rem* 示例



*rem* 是全部的长度都相对于根元素，根元素是谁？

那就是 *html*元素。通常做法是给 *html* 元素设置一个字体大小，然后其他元素的长度单位就为 *rem*。

例如：

```html
<div>
  我是父元素div
  <p>
    我是子元素p
    <span>我是孙元素span</span>
  </p>
</div>
```

```css
* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 10px;
}

div {
  font-size: 4rem;
  /* 40px */
  width: 30rem;
  /* 300px */
  height: 30rem;
  /* 300px */
  outline: solid 1px black;
  margin: 10px;
}

p {
  font-size: 2rem;
  /* 20px */
  width: 15rem;
  /* 150px */
  height: 15rem;
  /* 150px */
  outline: solid 1px red;
}

span {
  font-size: 1.5rem;
  width: 10rem;
  height: 10rem;
  outline: solid 1px blue;
  display: block;
}
```

所以当用 *rem* 做响应式时，直接在媒体中改变 *html* 的 *font-size*，此时用 *rem* 作为单位的元素的大小都会相应改变，很方便。

看到这里我想大家都能够更深刻的体会了 *em* 和 *rem* 的区别了，其实就是参照物不同。



## *base64* 图像

在开发中我们经常会将一些小图片以 *base64* 的形式来加载和存储。

图片的 *base64* 编码就是可以将一张图片数据编码成一串字符串，使用该字符串代替图像地址。

这样做有什么意义呢？

我们知道，我们所看到的网页上的每一个图片，都是需要消耗一个 *http* 请求下载而来的。

例如，有如下的代码：

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div{
            width: 100px;
            height: 100px;
            border: 1px solid;
            background: url('heart.png') no-repeat; 
            background-size: 100%;
            background-position: center;
        }
    </style>
</head>
<body>
    <div></div>
</body>
</html>
```

在浏览器中打开该页面，到 *Network* 面板查看 *http* 请求，可以看到实际上发送了 *2* 次请求，并且可以看到每一次请求所花费的时间，如下图：

![image-20220217092401940](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-17-012402.png)

没错，不管如何，图片的下载始终都要向服务器发出请求，要是图片的下载不用向服务器发出请求，而可以随着 *CSS* 的下载同时下载到本地那就太好了，而 *base64* 正好能解决这个问题。

网上有很多在线图片转换和压缩的网站，随便选一个即可。我们将 *heart.png* 这张图片在线转换为了 *base 64* 字符串。

![image-20220217092525112](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-17-012525.png)

接下来在设置 *background* 时，*url* 中使用转换得到的字符串，如下图：

![image-20220217092602194](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-17-012602.png)

重新请求页面，就不会再发送图片的 http 请求了，因为图片已经随着 *html* 一起到了本地。

今天晚上要用到的图片的 *base64* 编码为：

```css
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E %3Cpath d='M144 208c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z'%3E%3C/path%3E %3C/svg%3E
```

当然，不是说 *base64* 编码就是万能的。

一般来讲，我们会将一些比较小的图片进行 *base64* 编码，如果图片比较大，例如像电商网站那种商品图片，使用 *base64* 编码反而得不偿失，因为编码出来的字符串会非常非常大。另外，即使是小图片，但是小图片比较多，也不推荐使用 *base64* 编码，这种场景更加推荐使用 *CSS* 精灵图。



## *CSS 2D* 变形

变形是 *CSS3* 新提供的功能，可以让前端开发者在不借助 *JavaScript* 的情况下更改 *DOM* 元素的外观。

*CSS3* 中的变形分为 *2D* 变形和 *3D* 变形。这里我们先介绍 *CSS2D* 变形中的“位移”。

*2D* 位移对应有 *3* 个变形函数，分别是 *translate、translateX、translateY*

用法也非常简单，*translate* 方法从其当前位置移动元素（根据为 *X* 轴和 *Y* 轴指定的参数）。

```css
div {
  transform: translate(50px, 100px);
}
```

上面的例子把 *div* 元素从其当前位置向右移动 *50* 个像素，并向下移动 *100* 个像素：效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-17-013606.png" alt="image-20220217093605545" style="zoom:80%;" />

## *CSS3* 计算函数 *calc*

*calc* 是英文单词 *calculate*（计算）的缩写，是 *CSS3* 的一个新增的功能。

*MDN* 的解释为可以用在任何长度、数值、时间、角度、频率等处，语法如下：

```css
/* property: calc(expression) */
width: calc(100% - 80px);
```

可以用常见的 + - * / 符号来进行运算，但需要注意的是 + 和 - 必须用空格隔开，原因很简单，如果 - 号和计算的数字挨在一起，则浏览器在解析时会认为这可能是一个负值。

例如：

```css
width: calc(100% -8px); /* 这样会出错,结果为0 */
```

```css
width: calc(100% - 8px); /* 当 + -  符号用空格隔开时,运算成功 */
```



接下来我们来看一下 *calc* 函数的具体使用示例，如下：

```html
<div class="container">
  <div class="item"></div>
</div>
```

```css
* {
  margin: 0;
  padding: 0;
}

.container{
  width: 500px;
  height: 250px;
  background-color: skyblue;
  margin: 10px;
  position: relative;
}
.item{
  width: 100px;
  height: 100px;
  background-color: pink;
  position: absolute;
  left: calc(50% - 50px);
  top: calc(50% - 50px);
}
```

效果：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-09-062341.png" alt="image-20210914174033014" style="zoom:50%;" />



## *var* 函数

*CSS3* 为我们提供了 *var* 函数。

该函数用于插入自定义的属性值，如果一个属性值在多处被使用，该方法就很有用。

具体的语法如下：

```css
var(custom-property-name, value)
```

- *custom-property-name*：必需。自定义属性的名称，必需以 -- 开头。
- *value*：可选。备用值，在属性不存在的时候使用。

例如：

```html
<div id="div1"></div>
<div id="div2"></div>
```

```css
:root {
  --main-bg-color: coral;
}
div{
  width: 300px;
  height: 300px;
  margin: 10px;
}
#div1 {
  background-color: var(--main-bg-color);
}

#div2 {
  background-color: var(--main-bg-color);
}
```

>:root 选择器匹配文档根元素。
>
>在 *HTML* 中，根元素始终是 *html* 元素。

还有一种用法，就是通过 *HTML* 元素来传递变量的值，例如：

```html
<div id="div1" style="--main-bg-color:coral"></div>
<div id="div2" style="--main-bg-color:skyblue"></div>
```

```css
div{
  width: 300px;
  height: 300px;
  margin: 10px;
}
#div1 {
  background-color: var(--main-bg-color);
}

#div2 {
  background-color: var(--main-bg-color);
}
```

在上面的代码中，我们没有在 *CSS* 中统一设置变量的值，而在在 *HTML* 元素的 *style* 中分别对变量赋值，代码同样是合法的。

在 *style* 中除了书写变量的值以外，其他样式也可以正常书写的。

```css
 <div id="div1" style="--main-bg-color:coral;border: 5px solid red;"></div>
```



## *CSS* 属性的边界渲染特性

*opacity* 属性设置元素的不透明级别。

从 *0.0* （完全透明）到 *1.0*（完全不透明）。

但是通过上面的设置 *var* 函数的设置后，很多值都超过了 *1* 这个范围。

当 *CSS* 属性值超过其合法范围后，会使用边界值作为其计算值。

例如 *opacity:999* 会渲染为 *opacity:1*，*opacity:-9* 会渲染为 *opacity:0*，*font-size* 属性也是类似，*font-size:-99px* 会渲染为 *font-size:0*。

例如，我们希望变量值小于等于 *99px* 的时候文字隐藏，则可以这样处理：

```css
font-size: calc(var(--num) * 1px - 99px)
```

此时：

- 如果 *--num* 值是 *99*，则 *font-size* 计算值就是 *0*
- 如果 *--num* 值是 *98*，则 *font-size* 计算值就是 *-1px*，会按照 *0* 渲染，文字依然隐藏。



## *min* 函数

但是上面的实现有个问题，那就是如果 *--num* 值是 *100*，则 *font-size* 计算值就是 *1px*，这肯定不行，我们希望只要变量值大于 *99*，就全部按照指定的字号大小显示，不是动态变化的。

这个可以通过放大系数同时配合 *min( )* 函数的方法来实现。

*min* 函数的作用是多组值中取较小的那一个值。例如：

```css
width: min(700px, 50px, 500px);
```

最终 *width* 的值就为 *50px*。

这里的放大系数取的是 *100*，也就是有：

```css
font-size: calc(var(--num) * 100px - 9900px)
```

此时，当 *--num* 值是 *100* 的时候，*font-size* 计算值就是 *100px*，再和规定的字号大小取小，自然字号尺寸就恒定了：

```css
font-size: min(16px, calc(var(--num) * 100px - 9900px))
```



---



-*EOF*-