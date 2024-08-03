// 让轮播图动起来

// 1. 滚动轮播图的滚动原理
// n => n+1

// 2. 滚动效果实现
// 2.1 css动画，过度
// 2.2 js动画，封装js运动函数

// css 过度

// 获取页面中的DOM元素
var lbtn = document.getElementById("lbtn");
var rbtn = document.getElementById("rbtn");
var swiper = document.getElementById("swiper");
var dotsList = document.getElementById("dots-list").getElementsByTagName("li");

// 表示，当前轮播的页数
var np = 0;
// 总页数
var tp = 5;

// lock
var lock = false;


// 向左走
rbtn.onclick = function () {
  if (lock) {
    return;
  }
  lock = true;
  // 开启过度
  swiper.style.transition = "all 0.5s";
  // 下一个图片
  np++;
  // 运动到对应位置
  swiper.style.transform = `translateX(${np * -564}px)`;
  // 调整dotsList 样式
  for (var i = 0; i < dotsList.length; i++) {
    dotsList[i].className = null;
  }
  dotsList[np % 5].className = "active";
};

swiper.addEventListener("transitionend", function () {
  lock = false;
  if (np >= tp) {
    np = 0;
    this.style.transition = "none";
    swiper.style.transform = `translateX(${np * -564}px)`;
  }
});
