//- 我要干啥  找到他 按钮 处理他 点击他 换**指定**图片

var navLists = document.getElementsByClassName('nav-list')
var bannerLists = document.getElementsByClassName('banner-list')
for (var i = 0; i < navLists.length; i++) {
  navLists[i].addEventListener('click', function () {
    var index = getIndex(this);
    bannerLists[index].style.display = 'block';
  })
}


var getIndex = function (node) {
  for (var i = 0; i < navLists.length; i++) {
    if (node === navLists[i]) {
      return i;
    }
  }
}
