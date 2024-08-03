# 纯 CSS 制作左右摇摆小球课堂笔记



## *CSS3* 弹性盒布局

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



## *CSS3* 新增单位 *vw、vh*

*CSS3* 中新增了 *vw* 和 *vh* 这两个相对单位，英语全称为 *viewport width* 和 *viewport height*，也就是视口宽度和视口高度。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-09-024231.png" alt="image-20211009104231082" style="zoom:50%;" />

前面所对应的数值是百分比，如果设置值为 *1vw*，代表占用视口宽度的 *1%*，*100vw* 则为占用视口宽度的 *100%*。



## *CSS3* 过渡

*CSS3* 新增了过渡属性，可以使用从一个状态变化到另一个状态时，变化更加的平滑。

*CSS3* 的过渡功能像是一种黄油，*W3C* 标准中是这样描述 *transition* 的：*CSS3* 的 *transition* 允许 *CSS* 的属性值在一定的时间区间内平滑的过渡。这种效果可以在鼠标单击，获得焦点，对元素任何改变中触发，并平滑地以动画效果改变 *CSS* 的属性值。

下面来看一个示例，如下：

```html
<div></div>
```

```css
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
}
div:hover{
  height: 300px;
}
```

在上面的代码中，我们让 *div* 被 *hover* 的时候，改变其高度，但是我们可以看到效果非常的生硬。

此时我们就可以添加一个 *CSS3* 新增的属性 *transition*，使其两个状态变化之间产生一个过渡效果。

```css
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  transition: all .5s;
  /* 添加过渡效果 */
}
div:hover{
  height: 300px;
}
```

上面的 *transition* 实际上是一个复合属性，该属性是 *transition-property，transition-duration，transition-timing-function* 和 *transition-delay* 的一个简写属性。

- *transition-property*：指定过渡的 *CSS* 属性
- *transition-duration*：指定过渡所需的完成时间
- *transition-timing-function*：指定过渡函数
- *transition-delay*：指定过渡的延迟时间



## *CSS3* 变形

变形是 *CSS3* 新提供的功能，分为 *2D* 变形和 *3D* 变形。

本次案例中我们会用到 *2D* 变形的相关知识，主要用到的是 *2D* 旋转。

*2D* 旋转对应的只有 *1* 个变形函数 *rotate*，这个我们在前面也已经用过了。

该变形函数只接受一个值代表旋转的角度值，取值可正可负，正值代表顺时针旋转，负值代表逆时针旋转。

```css
div {
  transform: rotate(20deg);
}
```

上面的例子把 *div* 元素顺时针旋转 *20* 度，效果如下：

![Rotate](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-19-012914.png)



## 伪元素选择器

伪元素是一个附加至选择器末的关键词，为了和伪类选择器进行区别，从 *CSS3* 开始规定伪元素使用两个冒号。

区别于伪类是选择元素的不同状态，**伪元素是选择元素的特定部分**。

举个例子，*first-line* 就是一个伪元素选择器，它选择的是段落的第一行。

```css
/* 每一个 <p> 元素的第一行。 */
p::first-line {}
```

再例如，*first-letter* 也是一个伪元素选择器，它选择的是块级元素第一行的第一个字母。

```css
/* 选择 <p> 元素的第一个字母 */
p::first-letter {}
```

再例如 *placeholder*，这是 *CSS3* 新增的属性，可以为文本输入框设置提示信息，如果想要设置 *placeholder* 的样式，用到的也是一个伪元素选择器。

```css
input::placeholder {}
```

打开 *MDN*，可以看到伪元素选择器同样也是很多的：*https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements*

今天晚上要介绍两个常用的伪元素选择器：

- *::before*
- *::after*



## *CSS3* 动画

在 *CSS3* 中新增了一个 *animation* 模块，可以制作出类似于 *flash* 一样的动画出来。在正式介绍 CSS3 的动画概念之前，我们先来看两个重要的概念，**动画**与**关键帧**。



### 什么是动画？

大家一定还记得，小时候我们看电影，放映员都是拿着一大盘的胶片，装在投影灯上来播放电影的，这也就是老式的胶片电影。通过将电影的一幕幕画面先洗在胶片上，然后将胶片快速的从投影灯前移动来打到大影幕上，从而在荧幕上显出连贯的画面来。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-013540.png" alt="image-20211025093539677" style="zoom:60%;" />

胶片上的一个画面，就叫做一帧。一段动画，从本质上讲就是一段时间内连续播放的一定数量的画面。

根据人眼的视觉残留特性，*1* 秒种播放 *24* 帧，是电影画面实现流畅不卡顿视觉效果的最低要求。*1* 秒钟多于 *24* 帧，看起来不会有太大区别，但 *1* 秒钟少于 *24* 帧，你就会觉得在看 *PPT*。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-014905.png" alt="image-20211025094904860" style="zoom:60%;" />

为了省钱，动画公司会选择“一拍二”，也就是 *1* 秒 *24* 帧，每张图用 *2* 帧。这样一秒钟的动画只需要画 *12* 张图。

可是对于一些常规的动作而言，*1* 秒 *12* 张图还是多了。这时就需要用到“关键帧”。



### 什么是关键帧？

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-015418.png" alt="image-20211025095418170" style="zoom:50%;" />

关键帧指的是，在构成一段动画的若干帧中，起到决定性作用的 *2-3* 帧。

关键帧通常是 *1* 秒动画的第一帧和最后一帧。如果动作稍复杂点，那就在中间的位置再加一帧。

关键帧可以决定动作的起始状态和结束状态，两个关键帧之间的时间还决定了动作的节奏。对于常规的说话、行走、奔跑、打斗动作，*2-3* 张关键帧就可以把整个动作的基本面貌确定下来了。

当然，光靠两三张关键帧是不能撑起一段完整动画的，还需要安排画师把关键帧之间缺失的大约 *10* 张画面补上。这些起补充作用的画面就叫“中间画”。

关键帧的意义在于解放精锐劳动力，让技术过硬的高级动画师专注于创作和绘制关键部分的动作，把他们从重复机械的非关键动作绘制中解放出来。



在 *3D* 领域，基本上所有 *3D* 动画都是关键帧动画。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-020500.png" alt="image-20211025100459743" style="zoom:50%;" />

*3D* 动画的制作过程本质上是一个打关键帧的过程（也叫做 *K* 帧）。动画师只需把角色或道具在关键时间节点上的位置、姿态、动作摆好，打上关键帧，剩下的中间过程全部交给电脑来填空。（和 *CSS3* 中的动画很相似了）

关键帧在动画和视频剪辑领域运用相当广，但它并非一个复杂的概念，说到底就是一头一尾定中间。



### 快速入门

上面介绍了关于动画和关键帧的知识，接下来我们就来看一个 *CSS3* 中动画的快速入门示例，如下：

```html
<div></div>
```

```css
*{
  margin: 0;
  padding: 0;
}
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  position: absolute;
  animation: test 5s;
}
@keyframes test{
  0% {
    left: 0;
    top: 0;
  }
  25% {
    left: 400px;
    top: 0;
  }
  40% {
    left: 400px;
    top: 200px;
  }
  65% {
    left: 0;
    top: 200px;
  }
  100% {
    left: 0;
    top: 0;
  }
}
```



在上面的代码示例中，我们声明了一个名为 *test* 的动画，然后在 *div* 中运用了这个动画，整个动画的播放时间为 *5s*。



接下来我们来看一下 *CSS3* 中动画的具体细节。

使用 *CSS3* 的 *animation* 制作动画包含两个部分：首先是用关键帧声明一个动画，其次是在 *animation* 调用关键帧声明的动画。



### 声明动画

在 *CSS3* 中，使用 *@keyframes* 来声明一个动画，语法为：

```css
@keyframes animationname {keyframes-selector {css-styles;}}
```

属性对应的说明如下：

![image-20210915101256811](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-19-012600.png)

在上面的示例中，我们声明动画的代码为：

```css
@keyframes test{
  0% {
    left: 0;
    top: 0;
  }
  25% {
    left: 400px;
    top: 0;
  }
  40% {
    left: 400px;
    top: 200px;
  }
  65% {
    left: 0;
    top: 200px;
  }
  100% {
    left: 0;
    top: 0;
  }
}
```

这里我们就声明了一个名为 *test* 的动画，设置了 *5* 个时间段，分别是 *0%、25%、40%、65%* 和 *100%*，每个时间段都有对应的不同 *CSS* 样式，当动画执行时，从一个时间段到另一个时间段会自动运用过渡效果，所以我们可以看到整个流程是非常平滑的。



### 使用动画

*@keyframes* 只是用来声明一个动画，如果一个声明的动画不被调用，那么这个动画是没有任何意义的。

在 *CSS3* 中通过 *animation* 属性来调用动画。



语法如下：

```css
animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```



- *animation-name*：指定要绑定到选择器的关键帧的名称
- *animation-duration*：动画指定需要多少秒或毫秒完成
- *animation-timing-function*：设置动画将如何完成一个周期
- *animation-delay*：设置动画在启动前的延迟间隔
- *animation-iteration-count*：定义动画的播放次数
- *animation-direction*：指定是否应该轮流反向播放动画
- *animation-fill-mode*：规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
- *animation-play-state*：指定动画是否正在运行或已暂停



前面 *4* 个属性没什么好说，大体上和前面介绍的 *transition* 的属性很像，这里我们主要看一下后面几个属性。



***animation-iteration-count***

*animation-iteration-count* 属性定义动画应该播放多少次，如果想要一直播放，那么次数就是无限次，所以属性值为 *infinite*。



***animation-direction***

正常情况下，动画播放完毕以后，会立刻回到起始的状态。例如：

```css
@keyframes test{
  0% {
    left: 0;
    top: 0;
  }
  50% {
    left: 400px;
    top: 0;
  }
  100% {
    left: 400px;
    top: 200px;
  }
}
```

对上面快速入门的示例稍作修改，我们就会发现，动画播放完毕后立马就回到起始状态了。

那么 *animation-direction* 就可以设置动画是否要反向播放回去。该属性对应的可设置值有：

```css
animation-direction: normal|reverse|alternate|alternate-reverse|initial|inherit;
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-19-012621.png" alt="image-20210915104829295"  />

需要注意的是，如果动画被设置为只播放一次，该属性将不起作用。

另外，无论动画正向播放还是反向播放，都会算一次次数，例如：

```css
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  position: absolute;
  animation: test 5s 5 alternate;
}
@keyframes test{
  0% {
    left: 0;
    top: 0;
  }
  50% {
    left: 400px;
    top: 0;
  }
  100% {
    left: 400px;
    top: 200px;
  }
}
```

在上面的代码中，我们设置一共播放 *5* 次，那么整个动画就会正向播放 *3* 次，反向播放 *2* 次。



***animation-fill-mode***

*animation-fill-mode* 属性规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。

一般主要用于设置动画播放完毕后的状态。

```css
animation-fill-mode: none|forwards|backwards|both|initial|inherit;
```

![image-20210915105722895](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-19-012620.png)

用得最多的值就是 *forwards*，定义动画播放完后保持结束时候的样子。默认值为 *none*，表示动画将按预期进行和结束，在动画完成其最后一帧时，动画会反转到初始帧处。当取值为 *backwards* 时，会在动画结束时迅速应用动画的初始帧。



***animation-play-state***

*animation-play-state* 属性规定动画正在运行还是暂停，语法为：

```css
animation-play-state: paused|running;
```

![image-20210915110118784](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-19-012619.png)

该属性一般配合着 *JS* 一起使用，从而达到对动画播放状态的一个控制。例如：

```html
<button id="playAnimate">播放动画</button>
<button id="pauseAnimate">暂停动画</button>
<div id="oDiv"></div>
```

```css
*{
  margin: 0;
  padding: 0;
}
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  position: absolute;
  animation: test 2s 5 alternate paused;
}
@keyframes test{
  0% {
    left: 0;
    top: 30px;
  }
  50% {
    left: 400px;
    top: 30px;
  }
  100% {
    left: 400px;
    top: 200px;
  }
}
```

```js
var oDiv = document.getElementById("oDiv");
var playAnimate = document.getElementById("playAnimate");
var pauseAnimate = document.getElementById("pauseAnimate");
playAnimate.onclick = function(){
  oDiv.style.animationPlayState = "running"
}
pauseAnimate.onclick = function(){
  oDiv.style.animationPlayState = "paused"
}
```

在上面的示例中，我们就通过 *JS* 来控制 *animation-play-state* 从而切换动画播放与暂停这两个状态。



## *CSS3* 倒影

*CSS3* 新增的*box-reflect* 属性用于设置倒影，其语法如下：

```css
box-reflect：none | <direction> <offset> <mask-box-image>
```

- *direction*：表示倒影的方向，有如下的取值
  - *above* 指定倒影在对象的上边
  - *below* 指定倒影在对象的下边
  - *left* 指定倒影在对象的左边
  - *right* 指定倒影在对象的右边

- *offset*：用来定义倒影与对象之间的间隔，可以是具体的长度值或者百分比（可以为负值）。
- *mask-box-image*：用于设置遮罩图像，有如下取值
  - *none* 无遮罩图像
  - *url* 使用绝对或相对地址指定遮罩图像
  - *linear-gradient* 使用线性渐变创建遮罩图像
  - *radial-gradient* 使用径向（放射性）渐变创建遮罩图像
  - *repeating-linear-gradient* 使用重复的线性渐变创建背遮罩像
  - *repeating-radial-gradient* 使用重复的径向（放射性）渐变创建遮罩图像



下面来看一个快速入门示例：

```html
<p>这是一个测试</p>
```

```css
p {
  width: 200px;
  background-color: skyblue;
  -webkit-box-reflect: right 15px;
}
```

效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-040218.png" alt="image-20211025120217525" style="zoom:50%;" />

在上面的代码中，我们设置了 *2* 个 *box-reflect* 属性的前面两个值，分别是倒影和间隔。

接下来我们来看第 *3* 个值 *mask-box-image*。

在设置此值之前，我们有必要了解 *CSS* 中关于遮罩（ *mask* ）相关的知识。

下面，我们来看一个 *CSS mask* 的快速入门示例。

首先需要准备两张图片，图片素材如下：

一张 *jpg* 图片：*zelda.jpg*

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-151154.png" alt="image-20211025231154694" style="zoom: 50%;" />

一张 *png* 图片：*mask.png*，该 *png* 图片背景为透明（这里划重点）

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-151236.png" alt="image-20211025231236440" style="zoom:50%;" />

接下来准备我们的测试目录：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-151518.png" alt="image-20211025231518012" style="zoom:50%;" />

*index.html* 代码如下：

```html
<div class="mask"></div>
```

```css
* {
  margin: 0;
  padding: 0;
}

div {
  width: 1200px;
  height: 600px;
  outline: 1px solid;
  margin: 50px auto;
  background: url('./zelda.jpg') no-repeat center/cover;
}

/*  
  虽然 .mask 和 div 都是选择中的相同的元素
  这里为了单独观察 mask 相关设置，
  和 mask 不相关的属性设置放入到了 div 选择器中 
*/
.mask {
  -webkit-mask-image: url('./mask.png');
}
```

在上面的代码中，我们为 *div* 设置了一个铺满整个盒子的背景图，然后为该盒子设置了遮罩效果。由于 *mask.png* 无法占满整个盒子，所以出现了重复的效果，***mask.png* 遮罩图片透明的部分不会显示底部图片的信息，而非透明部分则会显示底层图片信息**。

效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-151805.png" alt="image-20211025231804573" style="zoom:50%;" />

除了设置透明的 *png* 图片，还可以设置透明的渐变。

首先来看一下透明渐变：

```html
<div></div>
```

```css
div{
  width: 200px;
  height: 200px;
  outline: 1px solid;
  background-image: linear-gradient(transparent 10%, red);
}
```

效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-19-014406.png" alt="image-20211119094405964" style="zoom:50%;" />

当我们将渐变图形设置为遮罩时，由于上面偏透明，所以上面的图像会被挡住不被显示出来，而下方的图像能够正常显示出来。

```css
.mask {
  -webkit-mask-image: linear-gradient(transparent 10%, white);
}
```

在上面的代码中，我们设置了一个从上到下的线性透明渐变，效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-26-013708.png" alt="image-20211026093708467" style="zoom:50%;" />

简单了解了 *CSS* 遮罩相关知识后，回到我们的 *CSS* 倒影部分，接下来我们来将第三个属性值遮罩图像添加上，例如：

```html
<div></div>
```

```css
div {
  width: 200px;
  height: 200px;
  background-color: skyblue;
  -webkit-box-reflect: right 15px linear-gradient(transparent 10%, rgba(255, 255, 255, 0.3));
}
```

效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-040706.png" alt="image-20211025120706683" style="zoom:50%;" />



-*EOF*-