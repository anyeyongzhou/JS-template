// 让轮播图动起来

// 1. 滚动轮播图的滚动原理
// n => n+1

// 2. 滚动效果实现
// 2.1 css动画，过度
// 2.2 js动画，封装js运动函数

// js 动画

// 获取页面中的DOM元素
var lbtn = document.getElementById("lbtn");
var rbtn = document.getElementById("rbtn");
var swiper = document.getElementById("swiper");
var dotsList = document.getElementById("dots-list").getElementsByTagName("li");

// 表示，当前轮播的页数
var np = 0;
// 总页数
var tp = 5;

var lock = false;

lbtn.onclick = function () {
  if (lock) {
    return;
  }
  lock = true;
  if (np == 0) {
    np = 5;
    swiper.style.left = 5 * -564 + "px";
  }
  move(swiper, "left", np-- * -564, np * -564, 300, function () {
    lock = false;
  });
  // 调整dotsList 样式
  for (var i = 0; i < dotsList.length; i++) {
    dotsList[i].className = null;
  }
  dotsList[np % 5].className = "active";
};
rbtn.onclick = function () {
  // 0 => 1 1=>2 2=>3 3=>4 4=>5
  if (lock) {
    return;
  }
  lock = true;
  if (np == 5) {
    np = 0;
    swiper.style.left = 0;
  }
  move(swiper, "left", np++ * -564, np * -564, 300, function () {
    lock = false;
  });
  // 调整dotsList 样式
  for (var i = 0; i < dotsList.length; i++) {
    dotsList[i].className = null;
  }
  dotsList[np % 5].className = "active";
};

function move(dom, prop, start, end, t, fn) {
  var distance = start;
  // 如果想控制元素运动的快慢？如何，时间间隔，步长（单位时间，走的的距离）
  // var step = 3;
  // v = l / t
  // (end- start) / t
  var step = ((end - start) / t) * 10;
  // 这里的 负数，代表的是方向
  // if (end < start) {
  //   step *= -1;
  // }

  var tid = setInterval(function () {
    distance += step;
    dom.style[prop] = distance + "px";
    // 校准
    if ((distance >= end && step > 0) || (distance <= end && step < 0)) {
      // 归位
      dom.style[prop] = end + "px";
      clearInterval(tid);
      if (typeof fn == "function") {
        fn();
      }
    }
  }, 10);
  // dom.setAttribute("tid", tid);
}

// 自己动
var autoId = null;
function autoMove() {
  clearInterval(autoId);
  autoId = setInterval(function () {
    rbtn.click();
  }, 2000);
}
autoMove();

var wrapper = document.getElementsByClassName("swiper-wrapper")[0];
wrapper.onmouseenter = function () {
  clearInterval(autoId);
};
wrapper.onmouseleave = function () {
  autoMove();
};

// 小白点点击动
document.getElementById("dots-list").onclick = function (e) {
  if (e.target.tagName == "LI") {
    var li = e.target;
    var id = Number(li.dataset.id);
    move(swiper, "left", np * -564, id * -564, 300, function () {
      lock = false;
    });
    np = id;
    // 调整dotsList 样式
    for (var i = 0; i < dotsList.length; i++) {
      dotsList[i].className = null;
    }
    dotsList[np % 5].className = "active";
  }
};
