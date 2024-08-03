var obj = {
  flag: false,
  //入口函数
  init: function (ele) {
    this.ele = ele;
    var $title = $(".title");

    $title.on("click", { ele: this.ele, aa: 123 }, this.dropDown.bind(this)); //注意this指向问题
  },
  // 点击事件触发的函数

  dropDown: function (e) {
    if (this.flag == false) {
      this.flag = true;
      var $ele = e.data.ele,
        $target = $(e.target);
      if (e.target.nodeName.toUpperCase() == "I") {
        $target = $target.parent();
      }
      var $next = $target.next(),
        $nextClass = $next.attr("class");
      //展示、隐藏该菜单，注意this指向问题
      $next.slideToggle(
        400,
        function () {
          this.flag = false;
        }.bind(this)
      );

      $target.parent().toggleClass("active");

      //隐藏无关菜单
      if ($nextClass == "submenu1") {
        $ele
          .find(".submenu1")
          .not($next)
          .slideUp()
          .parent()
          .removeClass("active");
      } else if ($nextClass == "submenu2") {
        $ele
          .find(".submenu2")
          .not($next)
          .slideUp()
          .parent()
          .removeClass("active");
      }
    }
  },
};
obj.init($(".list"));
