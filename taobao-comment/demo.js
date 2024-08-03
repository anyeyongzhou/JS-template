init();
function init() {
    start();
    bindEvent();
}
// 为当前选中添加具有选中样式得class类名
var activeClass = 'tm-current',
    nextBtn = $('.navRight'),
    ulCon = $('.photos'),
    boxCon = $('#photoView'),
    len = $('li').length;  
preBtn = $('.navLeft');
function start() {
    // 点击 每一张小图
    $('li').on('click', function () {
        var $this = $(this);
        // 将当前点击这张添加上选中样式  其他的兄弟节点移除选中样式
        $this.toggleClass(activeClass).siblings().removeClass(activeClass);
        // 获得到当前选中li下得图片src
        var src = $this.find('img').attr('src'),
            flag = $this.hasClass(activeClass),
            // 创建图片
            img = new Image();
        // 将图片src设置为选中图片
        img.src = src;
        if (flag) {
            // 当图片加载完
            img.onload = function () {
                // 获得展示图片宽高
                var imageW = img.width;
                var imageH = img.height;
                // 设置图片展示区域得宽高
                boxCon.css({
                    'height': imageH + 'px',
                    'width': imageW + 'px',
                    'transition': 'all 100ms ease-out'
                })
                // 图片缩放  展示部分背景  
                boxCon.find('img').css({
                    'transform': 'scale(0.96)'
                })
                // 点击图片  将选中li移除选中状态
                boxCon.find('img').on('click', function () {
                    $this.removeClass(activeClass);
                    // 将下方显示图片区域设置宽高为0
                    boxCon.css({
                        'width': 0,
                        'height': 0,
                    })
                })
            }
            // 设置图片src
            boxCon.find('img').attr('src', src);
        } else {
            // 点击缩小图片   将展示区域设置为0
            boxCon.css({
                'width': 0 + 'px',
                'height': 0 + 'px',
                'transition': 'all 100ms ease-out'
            })
        }
    })
}
// 左右切换图片点击事件
function bindEvent() {
    var clickTar = {};
    // 点击左右按钮
    $('.navicon').on('click', function () {
        var $this = $(this);
        // 判断是左侧还是右侧按钮
        clickTar.class = $($this.parent()).attr('class');
        // 获得到当前显示图片得索引值
        clickTar.index = ulCon.find('li').index($('li.' + activeClass));
        var index = clickTar.index;
        // 操作索引值
        clickTar.class == 'navLeft' ? index-- : index++;
        // 判断临界值
        if (index >= 0 && index <= len) {
            // 获得操作索引值后得 图片src
            var src = ulCon.find('li').eq(index).find('img').attr('src');
            // 将当前li添加展示class类名  其他兄弟节点移除选中class类名
            ulCon.find('li').eq(index).toggleClass(activeClass).siblings().removeClass(activeClass);
            // 设置显示区域图片得src
            boxCon.find('img').attr("src", src);
            var img = new Image();
            img.src = src;
            // 将图片显示出来
            boxCon.css({
                'height': img.height + 'px',
                'width': img.width + 'px',
                'transition': 'all 5ms ease-out'
            })
            boxCon.find('img').css({
                'transform': 'scale(0.96)'
            })
        }
    })
}