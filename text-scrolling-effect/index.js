(function () {
  var list = document.querySelector(".list");
  function cloneFirstItem() {
    var firstItem = list.children[0];
    var newItem = firstItem.cloneNode(true);
    list.appendChild(newItem);
  }
  cloneFirstItem();

  var duration = 2000;
  setInterval(moveNest, duration);
  var curIndex = 0;
  var itemHeight = 30;
  function moveNest() {
    var from = curIndex * itemHeight;
    curIndex++;
    var to = curIndex * itemHeight;
    var totalDuration = 500;
    var duration = 10;
    var times = totalDuration / duration;
    var dis = (to - from) / times;
    var timeId = setInterval(function () {
      from += dis;
      if (from >= to) {
        clearInterval(timeId);
        if (curIndex === list.children.length - 1) {
          from = 0;
          curIndex = 0;
        }
      }
      list.scrollTop = from;
    }, duration);
  }
})();
