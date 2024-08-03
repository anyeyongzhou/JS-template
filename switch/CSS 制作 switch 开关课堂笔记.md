# *CSS* 制作 *switch* 开关课堂笔记



## 复习 *label*

在正式开始实战之前，我们先来看一下本次制作 *switch* 开关的原理。

这里首先需要复习一下关于 *label* 标签的使用。



*label* 标签主要用于和 *input* 标签进行关联。

将一个 \<*label*> 和一个 \<*input*> 元素相关联主要有这些优点：

- 标签文本不仅与其相应的文本输入元素在视觉上相关联，程序中也是如此。 这意味着，当用户聚焦到这个表单输入元素时，屏幕阅读器可以读出标签，让使用辅助技术的用户更容易理解应输入什么数据。

- 你可以点击关联的标签来聚焦或者激活这个输入元素，就像直接点击输入元素一样。这扩大了元素的可点击区域，让包括使用触屏设备在内的用户更容易激活这个元素。



将一个 \<*label*> 和一个 \<*input*> 元素匹配在一起，你需要给 \<*input*> 一个 *id* 属性。而 \<*label*> 需要一个 *for* 属性，其值和  \<*input*> 的 *id* 一样。例如：

```html
<label for="male">男</label>
<input type="radio" name="gender" id="male">
<label for="female">女</label>
<input type="radio" name="gender" id="female">
```



另外，也可以将 \<*input*> 直接放在 \<*label*> 里，此时则不需要 *for* 和 *id* 属性，因为关联已隐含存在

```html
<label>男<input type="radio" name="gender" id="male"></label>
<label>女<input type="radio" name="gender" id="female"></label>
```



例如我们使用 *label* 来进行单选框的美化，其原理就是隐藏原本丑陋的单选框：

```css
input[type="radio"]{
  display : none;
}
```

但是一旦单选框隐藏了，用户怎么点击单选框呢？

没关系，我们让单选框和 *label* 相关联，这样用户就可以通过点击 *label* 从而点击到单选框。

而针对 *label* 标签，我们就可以做各种各样的样式优化，本次我们要做的 *switch* 开关也是相同的原理。



## *var* 函数

*CSS* 变量的语法由两个部分组成，一部分是 *CSS* 变量的声明，另一部分是 *CSS* 变量的使用。其中，*CSS* 变量的声明由 *CSS* 自定义属性及其对应的值组成，而 *CSS* 变量的使用则通过变量函数 *var( )* 调用 *CSS* 自定义属性来实现。

例如：

```css
:root{
  --primary-color : deepskyblue;
}
button {
  background-color : var(--primary-color)
}
```

在上面这段代码中，*--primary-color* 是 *CSS* 自定义属性名，*deepskyblue* 是 *CSS* 自定义属性值，*--primary-color : deepskyblue* 表示 CSS 变量声明，而 *var(--primary-color)* 表示 *CSS* 变量的使用。

在上面的代码中，我们将变量定义在 *:root* 里面的，*:root* 选择器匹配文档根元素，在 *HTML* 中，根元素始终是 *html* 元素。也就是说，我们是在根元素下定义了变量，但是这不是说只能在根元素下定义变量，例如：

```css
body {
  --primary-color : #369;
  background-color: var(--primary-color);
}
```

在上面的代码中，我们在 *body* 中定义了颜色变量并且使用。



另外，需要注意 *CSS* 自定义属性的作用域并不是全局的，例如：

```html
<p class="test">Lorem ipsum dolor sit amet.</p>
<p>Lorem ipsum dolor sit amet.</p>
```

```css
body {
  --primary-color : #369;
  --primary-color2 : pink;
  background-color: var(--primary-color);
}
.test{
  --test-color : red;
}
p{
  color: var(--test-color);
  background-color: var(--primary-color2);
}
```

效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-16-015559.png" alt="image-20211116095559256" style="zoom:50%;" />

在上面的代码中，我们在 *body* 中定义了两个颜色变量，第一个在 *body* 中使用，生效，第二个在两个 *p* 里面使用，也生效。

接下来我们在 .test 中定义了一个颜色变量 *--test-color*，可以看到只有第一个 *p* 生效，第二个 *p* 并没有生效。究其原因，是因为两个 *p* 都是 *body* 的子元素，所以在 *body* 中定义的颜色变量下面的子元素都能使用，而第一个 *p* 和第二个 *p* 是兄弟关系，所以第一个 *p* 中定义的颜色变量在第二个 *p* 中无法使用。

所以，*CSS* 自定义属性这种只能由元素自身或者后代元素使用的特性，本质上就是继承特性。也就是说，*HTML* 文档树中，后代元素可以原封不动地继承祖先元素设置的 *CSS* 自定义属性值。

因此，一般我们将全局使用的自定义属性都设置在 *:root* 伪类中，因为所有的元素都是 *HTML* 元素的子元素。



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



## *transition* 过渡

*CSS3* 新增了过渡属性，可以使用从一个状态变化到另一个状态时，变化更加的平滑。

*CSS3* 的过渡功能像是一种黄油，*W3C* 标准中是这样描述 *transition* 的：

*CSS3* 的 *transition* 允许 *CSS* 的属性值在一定的时间区间内平滑的过渡。这种效果可以在鼠标单击，获得焦点，对元素任何改变中触发，并平滑地以动画效果改变 *CSS* 的属性值。



先看一个快速入门示例，如下：

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

在上面的代码中，我们让 *div* 被 *hover* 的时候，改变其高度，但是我们可以看到效果非常的生硬。此时我们就可以添加一个 *CSS3* 新增的属性 *transition*，使其两个状态变化之间产生一个过渡效果。

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

上面就是一个快速入门示例，接下来我们来看一下 *transition* 的具体语法。

*transition* 属性是 *transition-property，transition-duration，transition-timing-function* 和 *transition-delay* 的一个简写属性。

- *transition-property*：指定过渡的 *CSS* 属性
- *transition-duration*：指定过渡所需的完成时间
- *transition-timing-function*：指定过渡函数
- *transition-delay*：指定过渡的延迟时间



## *CSS3* 动画

在 *CSS3* 中新增了一个 *animation* 模块，可以制作出类似于 *flash* 一样的动画出来。在正式介绍 CSS3 的动画概念之前，我们先来看两个重要的概念，**动画**与**关键帧**。



### 什么是动画？

大家一定还记得，小时候我们看电影，放映员都是拿着一大盘的胶片，装在投影灯上来播放电影的，这也就是老式的胶片电影。通过将电影的一幕幕画面先洗在胶片上，然后将胶片快速的从投影灯前移动来打到大影幕上，从而在荧幕上显出连贯的画面来。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-013540.png" alt="image-20211025093539677" style="zoom:60%;" />

胶片上的一个画面，就叫做一帧。一段动画，从本质上讲就是一段时间内连续播放的一定数量的画面。

![1](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-16-012349.gif)

一定时间内连续快速播放若干个帧，就成了人眼中所看到的动画。同样时间内，播放的帧数越多，画面看起来越流畅。

根据人眼的视觉残留特性，*1* 秒种播放 *24* 帧，是电影画面实现流畅不卡顿视觉效果的最低要求。*1* 秒钟多于 *24* 帧，看起来不会有太大区别，但 *1* 秒钟少于 *24* 帧，你就会觉得在看 *PPT*。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-014905.png" alt="image-20211025094904860" style="zoom:60%;" />

为了省钱，动画公司会选择“一拍二”，也就是 *1* 秒 *24* 帧，每张图用 *2* 帧。这样一秒钟的动画只需要画 *12* 张图。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-015105.png" alt="image-20211025095105074" style="zoom:50%;" />

可是对于一些常规的动作而言，*1* 秒 *12* 张图还是多了。这时就需要用到“关键帧”。



### 什么是关键帧？

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-015418.png" alt="image-20211025095418170" style="zoom:50%;" />

关键帧指的是，在构成一段动画的若干帧中，起到决定性作用的 *2-3* 帧。

关键帧通常是 *1* 秒动画的第一帧和最后一帧。如果动作稍复杂点，那就在中间的位置再加一帧。

![5](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-16-012551.gif)

关键帧可以决定动作的起始状态和结束状态，两个关键帧之间的时间还决定了动作的节奏。对于常规的说话、行走、奔跑、打斗动作，*2-3* 张关键帧就可以把整个动作的基本面貌确定下来了。

当然，光靠两三张关键帧是不能撑起一段完整动画的，还需要安排画师把关键帧之间缺失的大约 *10* 张画面补上。这些起补充作用的画面就叫“中间画”。

关键帧的意义在于解放精锐劳动力，让技术过硬的高级动画师专注于创作和绘制关键部分的动作，把他们从重复机械的非关键动作绘制中解放出来。

在 *3D* 领域，基本上所有 *3D* 动画都是关键帧动画。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-25-020500.png" alt="image-20211025100459743" style="zoom:50%;" />

*3D* 动画的制作过程本质上是一个打关键帧的过程（也叫做 *K* 帧）。动画师只需把角色或道具在关键时间节点上的位置、姿态、动作摆好，打上关键帧，剩下的中间过程全部交给电脑来填空。（和 *CSS3* 中的动画很相似了）

关键帧在动画和视频剪辑领域运用相当广，但它并非一个复杂的概念，说到底就是一头一尾定中间。

![8](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-16-012750.gif)

总结一下

- 关键帧是一段动画中起决定性作用的帧，通常 *2-3* 张

- *10%* 的关键帧可以决定 *90%* 的动画内容，剩下的 *10%* 由 *90%* 的中间画承担



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

![image-20210915101256811](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-16-012822.png)

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

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-16-012850.png" alt="image-20210915104829295"  />

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

![image-20210915105722895](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-16-012849.png)

用得最多的值就是 *forwards*，定义动画播放完后保持结束时候的样子。默认值为 *none*，表示动画将按预期进行和结束，在动画完成其最后一帧时，动画会反转到初始帧处。当取值为 *backwards* 时，会在动画结束时迅速应用动画的初始帧。



***animation-play-state***

*animation-play-state* 属性规定动画正在运行还是暂停，语法为：

```css
animation-play-state: paused|running;
```

![image-20210915110118784](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-16-012851.png)

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



-*EOF*-