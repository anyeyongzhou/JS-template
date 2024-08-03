
var dots = document.getElementById('dots');
setInterval(function () {
    dots.classList.remove('animate');
    setTimeout(function () {
        dots.classList.add('animate');
    }, 200);
},3750);

// 利用class名字设置当前动画得状态，移除class名为移除动画
// 再次设置class名字 重新开始运行动画