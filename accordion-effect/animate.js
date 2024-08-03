function createAnimation(options) {
  var from = options.from;
  var to = options.to;
  var totalMS = options.totalMS || 1000;
  var duration = options.duration || 15;
  var times = Math.floor(totalMS / duration);
  var dis = (to - from) / times;
  var curTimes = 0;
  var timerId = setInterval(function () {
    from += dis;
    curTimes++;
    if (curTimes >= times) {
      from = to;
      clearInterval(timerId);
      options.onmove && options.onmove(from);
      options.onend && options.onend();
      return;
    }
    options.onmove && options.onmove(from);
  }, duration);
}
