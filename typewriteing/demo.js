var letters = [];
// 获得26个英文字母 放到数组中
// 存放下落字母数组
var dropArr = [];
var len;
var width = document.body.clientWidth;
var height = document.body.clientHeight;
var box = document.getElementsByClassName('box')[0];
var dropNum = 5;
var timer;
var dropArr = [];
var score = 0;

// 获得26个字母 
function getLetter() {
    for (var i = 65; i < 91; i++) {
        letters.push(String.fromCharCode(i));
    }
    len = letters.length;
    createDom();
    countdown();
};
getLetter();
// 倒计时
function countdown() {
    var showTime = document.getElementsByClassName('show')[0];
    var over = document.getElementsByClassName('over')[0];
    var time = 30;
    var timeTimer = setInterval(function () {
        time--;
        showTime.innerHTML = time;
        // 时间到了  游戏结束  清除定时器  清除计时
        if (time == 0) {
            clearInterval(timeTimer);
            alert('游戏结束~得分:' + score);
            clearTimeout(timer);
            over.style.opacity = '1';
        }
    }, 1000);
}
// 生成标签 放着字母图片 插入到页面最上方
function createDom() {
    // 随机生成要下落得字母
    var num = Math.floor(Math.random() * len);
    // 将字母存放在数组中
    dropArr.push(letters[num]);
    // 创建img标签
    var oImg = document.createElement('img');
    oImg.className = 'letter';
    // 根据字母确定img得src
    var src = './img/letter/' + letters[num] + '.png';
    oImg.setAttribute('src', src);
    // 随机出现位置
    var left = Math.random() * (width - 100) + 'px';
    oImg.style.left = left;
    // 随机得动画下落时间
    oImg.style.anmationDelay = ran(3, 6) + 's';
    // 随机动画延迟时间
    oImg.style.animationDuration = ran(4, 10) + 's';
    // 插入到页面内
    box.appendChild(oImg);
    // 每隔1200ms生成一个
    timer = setTimeout(function () {
        createDom();
    }, 1200);
    bindEvent();
};

// 返回生成min,max范围内随机数 
function ran(min, max) {
    return Math.random() * (max - min) + min;
}
// 键盘落下事件
function bindEvent() {
    // 根据鼠标下落keycode值定位到数组中元素
    window.onkeydown = function (e) {
        if (e.key.length == 1) {
            // 将当前字母转化成大写字母
            var k = e.key.toUpperCase();
            // 在数组中确定点击字母  并且找到索引位置
            var letter = letters.find(function (item, index) {
                return item == k;
            });
            var index = dropArr.indexOf(letter);
            // 如果点击正确  在数组中移除字母  同时在页面中移除
            if (index !== -1) {
                dropArr.splice(index, 1);
                score += 10;
                box.removeChild(box.childNodes[index]);
            }
        }
    };
}

