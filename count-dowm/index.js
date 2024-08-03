function flipCard(card, to) {
  // 得到它目前的值
  var from = card.getAttribute("number");
  if (from === to.toString()) {
    // 没有必要变化了
    return;
  }

  card.setAttribute("number", to); // 更新number的值
  card.className = "card"; // 去掉 flip
  card.innerHTML = `<!-- 显示在前面的卡片 -->
  <div class="front">
    <!-- 翻动时，该元素向下翻 -->
    <div class="top">
      <span>${from}</span>
    </div>
    <div class="bottom">
      <span>${from}</span>
    </div>
  </div>
  <!-- 显示在后面的卡片 -->
  <div class="back">
    <div class="top">
      <span>${to}</span>
    </div>
    <div class="bottom">
      <span>${to}</span>
    </div>
  </div>`;
  // 强行让浏览器渲染一次
  card.clientHeight; // 读取尺寸、位置会导致浏览器reflow 重排
  // 附加样式flip，实现翻动
  card.className = "card flip";
}

var cardDay = document.getElementById("cardDay");
var cardHour = document.getElementById("cardHour");
var cardMinute = document.getElementById("cardMinute");
var cardSecond = document.getElementById("cardSecond");

var chineseNewYear = new Date(2021, 1, 12).getTime();

/**
 * 一调用该函数，就能够根据当前距离新年的时间，设置后每个卡片
 */
function setNumbers() {
  var dis = chineseNewYear - Date.now(); // 当前时间距离新年的毫秒数
  dis = Math.floor(dis / 1000); // 得到距离的秒数
  var days = Math.floor(dis / (3600 * 24));
  dis -= days * 3600 * 24; // 剩余不足一天的秒数
  var hours = Math.floor(dis / 3600);
  dis -= hours * 3600; // 剩余不足一小时的秒数
  var minutes = Math.floor(dis / 60);
  dis -= minutes * 60;
  var seconds = dis;

  flipCard(cardDay, days.toString().padStart(2, "0"));
  flipCard(cardHour, hours.toString().padStart(2, "0"));
  flipCard(cardMinute, minutes.toString().padStart(2, "0"));
  flipCard(cardSecond, seconds.toString().padStart(2, "0"));
}

setNumbers();
setInterval(setNumbers, 1000);