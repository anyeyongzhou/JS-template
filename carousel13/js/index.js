// DOM 查询辅助函数
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// 轮播图初始数据
var imageInfo = [
  {
    url: "../images/1.jpeg",
    title: "《火影》战斗力对比:旗木卡卡西VS宇智波带土!",
  },
  {
    url: "../images/2.jpeg",
    title: "情人节也是“反诈节”,莫让情人节变成情人“劫”",
  },
  {
    url: "../images/3.jpeg",
    title: "死神：一分钟带你看完连载了16年之久的死神动漫的精彩片段",
  },
  {
    url: "../images/4.jpeg",
    title: "《龙猫》:龙猫30周年 冬季温暖重映",
  },
  {
    url: "../images/5.jpeg",
    title: "夏目友人帐：夏目的生活好恐怖，妖精半夜出现，这大脸吓死了",
  },
  {
    url: "../images/6.jpeg",
    title: "《超震撼!》让我们一起来感受动漫里绝美的风景吧",
  },
  {
    url: "../images/7.jpeg",
    title: "《《刀剑神域：夺命凶弹》速刷等级视频教学 怎么快速刷等级？",
  },
];

// 获取 DOM 元素
var jumbotron = $(".jumbotron"); // 上面巨幕大图容器
var thumbnailUl = $(".thumbnail>ul"); // 下面的缩略图容器
var progressStatus = $(".progressStatus"); // 进度条
var progressPercent = 0; // 进度条百分比

// 初始化变量
var currentIndex = 0; // 当前图片的索引
var thumbnailWidth = 160; // 缩略图宽度
var canBeClick = true; // 是否能够点击，默认为 true

/**
 * 初始化函数
 */
function init() {
  var jumbotronContent = ""; // 拼接上面的巨幕图内容
  var thumbnailContent = ""; // 拼接下面的缩略图内容
  // 遍历整个图片信息
  for (var i = 0; i < imageInfo.length; i++) {
    // 判断是否是当前图片，如果是当前图片，样式不同
    if (i === currentIndex) {
      // 上面的巨幕图片，当前索引不添加 opacity 属性
      jumbotronContent += `
            <div class="jumbotronImage" data-id="${i}" style="background: url(${imageInfo[i].url}) no-repeat center/cover;">
                <span>${imageInfo[i].title}</span>
            </div>
        `;
      // 下面的缩略图，当前索引的 background-color 属性值为 rgb(137, 137, 137)
      thumbnailContent += `
        <li data-id="${i}" style="background-color: rgb(137, 137, 137);">
            <div data-id="${i}" style="
                background: url(${imageInfo[i].url}) no-repeat;
                background-size: cover;
            "></div>
        </li>
      `;
    } else {
      // 上面的巨幕图片，因为不是当前图片，所以添加 opacity 属性
      jumbotronContent += `
            <div class="jumbotronImage" data-id="${i}" style="background: url(${imageInfo[i].url}) no-repeat center/cover;opacity: 0;">
                <span>${imageInfo[i].title}</span>
            </div>
        `;
      // 下面的缩略图，因为不是当前图片，所以 background-color 使用 css 所设置的颜色
      thumbnailContent += `
        <li data-id="${i}">
            <div data-id="${i}" style="
                background: url(${imageInfo[i].url}) no-repeat;
                background-size: cover;
            "></div>
        </li>
     `;
    }
  }
  // 填充内容
  jumbotron.innerHTML += jumbotronContent; // 填充上面巨幕
  thumbnailUl.innerHTML += thumbnailContent; // 填充下面的缩略图

  // 初始化巨幕图片右下角轮播图总数
  $(".totalImage").innerHTML = imageInfo.length;
  $(".currentImage").innerHTML = currentIndex + 1;
}

/**
 * 更新轮巨幕和缩略图的背景框
 */
function updateJumbotron() {
  // 1. 更新巨幕图片
  var jumbotronImageCollection = $$(".jumbotronImage");
  for (var i = 0; i < jumbotronImageCollection.length; i++) {
    // 根据当前的索引，更新上面的巨屏
    if (i === currentIndex) {
      jumbotronImageCollection[i].style.opacity = 1;
    } else {
      jumbotronImageCollection[i].style.opacity = 0;
    }
  }

  // 2. 更新下面的缩略图的背景框
  var thumbnailCollection = $$(".thumbnail>ul>li");
  for (var i = 0; i < thumbnailCollection.length; i++) {
    if (thumbnailCollection[i].dataset.id == currentIndex) {
      thumbnailCollection[i].style.backgroundColor = "rgb(137, 137, 137)";
    } else {
      thumbnailCollection[i].style.backgroundColor = "rgb(216, 216, 216)";
    }
  }

  // 3. 更新右下角的当前图片索引
  $(".currentImage").innerHTML = currentIndex + 1;
}

/**
 * 绑定事件
 */
function bindEvent() {
  // 点击巨幕的时候

  jumbotron.onclick = function (e) {
    // 用户点击左箭头
    if (e.target.id === "leftArrow" && canBeClick) {
      canBeClick = false;
      progressPercent = 0;

      // 更新当前下标
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = imageInfo.length - 1;
      }

      // 更新上面的巨幕
      updateJumbotron();

      // 更新下面的缩略图
      // 核心思路：把最后一个加到前面，然后过渡，过渡结束后去除过渡
      var lastLi = thumbnailUl.removeChild(
        thumbnailUl.children[thumbnailUl.children.length - 1]
      );
      thumbnailUl.insertBefore(lastLi, thumbnailUl.children[0]);
      thumbnailUl.style.transform = `translateX(${-thumbnailWidth}px)`;
      // 由于连续两次使用了 transform，浏览器会自动合并成一次，因此这里设置一个异步
      setTimeout(function () {
        // 第二次位移需要过渡
        thumbnailUl.style.transition = "1s"; // 设置过渡
        thumbnailUl.style.transform = `translateX(0px)`;
        thumbnailUl.ontransitionend = function () {
          // 过渡结束后移出过渡效果
          thumbnailUl.style.transition = null;
          canBeClick = true;
        };
      }, 0);
    }

    // 用户点击右箭头
    if (e.target.id === "rightArrow" && canBeClick) {
      canBeClick = false;
      progressPercent = 0;

      // 更新当前的下标
      currentIndex++;
      if (currentIndex > imageInfo.length - 1) {
        currentIndex = 0;
      }

      // 更新上面的巨幕
      updateJumbotron();

      // 更新下面的缩略图
      // 核心思路：将第一张移动到最后
      thumbnailUl.style.transition = "1s"; // 设置过渡
      thumbnailUl.style.transform = `translateX(${-thumbnailWidth}px)`; // 平滑移出去
      thumbnailUl.ontransitionend = function () {
        // 过渡效果结束后，把第一个移动到最后
        var firstLi = thumbnailUl.removeChild(thumbnailUl.children[0]);
        thumbnailUl.appendChild(firstLi);
        // 去除过渡，让移动瞬间完成
        thumbnailUl.style.transition = null;
        thumbnailUl.style.transform = `translateX(0px)`;
        canBeClick = true;
      };
    }
  };

  // 点击缩略图的时候
  thumbnailUl.onclick = function (e) {
    // 要做的事情很简单，就是更新当前索引值，然后重新更新上面的巨幕和下面的缩略图
    // 进度条重置为 0
    currentIndex = ~~e.target.dataset.id;
    progressPercent = 0;
    updateJumbotron();
  };

  // 进度条移动函数
  function progressMove() {
    progressPercent += 0.1;
    progressStatus.style.width = progressPercent + "%";
    window.requestAnimationFrame(progressMove);
    if (progressPercent > 100) {
      progressPercent = 0;
      $(".rightArrow").click();
    }
  }

  // 进度条
  window.requestAnimationFrame(progressMove);
}

/**
 * 程序入口函数
 */
function main() {
  // 1. 初始化轮播图
  init();
  // 2. 绑定事件
  bindEvent();
}

main();
