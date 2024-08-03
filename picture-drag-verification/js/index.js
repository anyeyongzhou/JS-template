// 封装 DOM 查询方法
function $(selector) {
  return document.querySelector(selector);
  // 回头我们选择 DOM 元素，就可以使用 CSS 的语法，像下面：
  // $('#id') $('.className)
}

// 获取一系列的 DOM 元素
var imgBox = $(".imgContainer>.imgBox"); // 图片容器
var imgBlock = $(".imgBlock"); // 可以拖动的图片块
var imgGap = $(".imgGap"); // 图片缺块
var title = $(".imgContainer>h3"); // 上方的标题，回头要根据用户的操作来改变文字内容
var slider = $(".slider"); // 滑块区域
var btn = $("#btn"); // 滑块
var span = $(".slider>span"); // 滑块区域的文字

// 初始化函数
function init() {
  // 开始盘逻辑
  // 1. 随机生成背景图片

  var imgArr = ["t1.png", "t2.png", "t3.png", "t4.png", "t5.png"]; // 图片数组
  // 随机数的公式

  // Math.floor(Math.random() * 可能性数 + 第一个可能值)
  // 1-10
  // Math.floor(Math.random() * 10 + 1)

  var randomImg = Math.floor(Math.random() * imgArr.length); // 随机选择一张图片

  // 接下来就设置背景图以及拖动图片的背景图
  // `` ES6 里面提供的字符串模版
  // var name = "xiejie";
  // console.log(`Hello ${name}`); // Hello xiejie

  imgBox.style.backgroundImage = `url('./img/${imgArr[randomImg]}')`;
  imgBlock.style.backgroundImage = `url('./img/${imgArr[randomImg]}')`;

  // 2. 计算拖动图块和空缺图块的位置

  // 拖动图块能够设置的最大高度 = 图片盒子的高度 - 拖动图块的高度
  var heightRange = imgBox.offsetHeight - imgBlock.offsetHeight;
  var widthRange = imgBox.offsetWidth / 2 - imgBlock.offsetWidth;

  // 生成随机的 left 和 top 值
  var leftValue = Math.random() * widthRange + imgBox.offsetWidth / 2;
  var topValue = Math.random() * heightRange;

  // 设置图片缺口的 left 和 top 值
  imgGap.style.left = leftValue + "px";
  imgGap.style.top = topValue + "px";

  // 设置拖动图块的 left、top 以及 background-position
  imgBlock.style.left = "0px";
  imgBlock.style.top = topValue + "px";
  imgBlock.style.backgroundPositionY = -topValue + "px";
  imgBlock.style.backgroundPositionX = -leftValue + "px";

  // 还需要做一些初始化的操作

  // 3. 绑定事件
  btn.onmousedown = function (e) {
    // 设置图片块
    imgBlock.style.opacity = 1;
    imgBlock.style.transition = "none"; // 关闭掉过渡，让我们的拖动更加的丝滑

    // 设置标题
    title.innerHTML = "拖动图片完成验证";
    title.style.color = "black";

    // 设置滑块
    btn.style.transition = "none"; // 关闭过渡
    span.style.opacity = 0; // 让滑块区域的文字消失

    // 为整个滑块添加鼠标移动事件
    slider.onmousemove = function (ev) {
      // 接下来我们需要计算出滑块的距离
      var newLeft = ev.clientX - slider.offsetLeft - e.offsetX;

      // 计算边界
      if (newLeft < -2) {
        newLeft = -2;
      }

      if (newLeft > imgBox.offsetWidth - imgBlock.offsetWidth) {
        newLeft = imgBox.offsetWidth - imgBlock.offsetWidth;
      }

      // 设置拖动图片和滑块的 left 值
      imgBlock.style.left = newLeft + "px";
      btn.style.left = newLeft + "px";
    };

    // 为整个文档绑定鼠标抬起事件，之所以不绑定在 btn 上面，是因为有可能存在用户整个鼠标移出了 container 的请求
    document.onmouseup = function () {
      // 鼠标抬起，我们需要进行验证
      var diffLeft = imgGap.offsetLeft - imgBlock.offsetLeft; // 获取图片缺块和拖动图片的 left 差值

      // 允许有 5px 的误差
      if (diffLeft < 5 && diffLeft > -5) {
        // 验证成功
        imgBlock.style.opacity = 0;
        imgGap.style.opacity = 0;

        title.innerHTML = "验证成功";
        title.style.color = "red";
        slider.onmousemove = btn.onmousedown = document.onmouseup = null; // 验证成功后，删除事件
      } else {
        // 验证失败

        imgBlock.style.transition = "all .5s";
        imgBlock.style.left = "0px";

        btn.style.transition = "all .5s";
        btn.style.left = "-2px";

        title.innerHTML = "验证失败";
        title.style.color = "green";

        // 删除事件，但是不要删除 btn 的事件，因为回头用户还要重新拖动
        slider.onmousemove = document.onmouseup = null;
        span.style.opacity = 1;
      }
    };
  };
}

init();

$(".changeImg").onclick = init;
