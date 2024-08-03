//-  获取这个按钮，让这个隐藏的内容进行展示(获取隐藏内容元素)
//- 更换皮肤 
//- 为body添加背景图片
//-  点击小图片 （找到图片，进行事件的绑定）的时候进行背景图片替换

var btn = document.getElementById('btn');
var skinNode = document.getElementById('skinNode');
var imgLists = document.getElementsByTagName('img');


btn.onclick = function () {
  skinNode.style.display = 'block';
}

skinNode.onmouseleave = function () {
  this.style.display = 'none';
}

for (var i = 0; i < imgLists.length; i++) {
  imgLists[i].onclick = function () {
    //- 获取当前点击的小图片的自定义属性dataSrc
    var dataSrc = this.getAttribute('dataSrc');
    //- 为body添加背景图片   ./img/big[1,2,3,4].jpg
    document.body.style.backgroundImage = 'url(' + dataSrc + ')';

  }
}

//  todo  能不能用其他的形式实现这个案例 -> 闭包 
// [1，2，3，4，5，6，7，8，9，10 ，11，12]   //  闭包的形式

//- 100  5%   