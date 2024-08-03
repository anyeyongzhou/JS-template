var photos = $('.photos');
var list = $('.list');
var wrap = $('.wrapper');
var picLi;
var listLi;
var width = parseInt(wrap.width());
var height = parseInt(wrap.height());
var nowIndex = 0;
var rotate = true;

init();
function init() {
    createDom();
    change(0);
    bindEvent();
}
function createDom() {
    for (var i = 0; i < 10; i++) {
        var oLi = $('<li></li>');
        var pLi = '<li>\
        <img src="./images/'+ i + '.jpg" alt="">\
        <div class="content">picture</div>\
    </li>';
        list.append(oLi);
        photos.append(pLi);
        picLi = $('.photos li');
        listLi = $('.list li');
    }
}

function change(index) {
    for (var i = 0; i < 10; i++) {
        i % 2 == 0 ? d = 1 : d = -1;
        var deg = 360 - parseInt(Math.random() * 360)
        var z = parseInt(Math.random() * 100)
        var h = parseInt(Math.random() * (height + 100));
        var w = parseInt(Math.random() * (width + 100));
        (parseInt(Math.random() * 10) % 2) == 0 ? p = 1 : p = -1;
        $(picLi[i]).css({
            'transform': 'rotateZ(' + d * deg + 'deg) translateZ(-' + z + 'px)',
        });
        $(picLi[i]).on('transitionend', (function (i) {
            $(picLi[i]).animate({
                'z-index': 0,
                'top': p * h / 2 + 'px',
                'left': p * w / 2 + 'px'
            }, '1500', 'swing')
        })(i));
        $(listLi[i]).css({
            'transform': 'rotateY(' + 0 + 'deg) scale(' + 1 + ')',
            'backgroundColor': '#00807A',
        })

    }
    $(picLi[index]).animate({
        top: 0 + 'px',
        left: 0 + 'px',
    }, 10, function () {
        $(picLi[index]).css({
            'transform': 'rotateZ(' + 0 + 'deg) translateZ(' + 10 + 'px)',
            'z-index': 1000,
        })
    })
    $(listLi[index]).css({
        'transform': 'rotateY(' + 360 + 'deg) scale(' + 2 + ')',
    })
}

function bindEvent() {
    picLi.on('click', function () {
        var $this = $(this);
        changeIndex($this.index());
    })
    listLi.on('click', function () {
        var $this = $(this);
        changeIndex($this.index());
    })
}
function changeIndex(index) {
    if (nowIndex != index) {
        nowIndex = index;
        change(index);
    } else {
        if (rotate) {
            rotate = false;
            getRotate(1, index)
        } else {
            rotate = true;            
            getRotate(-1, index)
        }
    }
}

function getRotate(r, index) {
    var color;
    r === 1 ? color = 'red' : color = '#00807A';
    $(picLi[index]).css({
        'transform': 'rotateY(' + r * 360 + 'deg) translateZ(-' + 0 + 'px)',
        'transition': 'all .3s ease-in-out',
    });
    $(picLi[index]).on('transitionend', function () {
        $(picLi[index]).css({
            'transform': 'rotateY(' + 0 + 'deg) translateZ(' + 0 + 'px)',
            'transition': 'all 0s',
        });
    })
    $(listLi[index]).css({
        'backgroundColor': color,
        'transform': 'rotateY(' + r * 180 + 'deg) scale(' + 2 + ')',
    });
    $(listLi[index]).on('transitionend', function () {
        $(listLi[index]).css({
            'transform': 'rotateY(' + 0 + 'deg) scale(' + 2 + ')',
            'transition': 'all 0s',
        });
    })
}
