var wrapUl = $('.wrap-ul');
// var row = 5;
// var col = 5;
var wrapW = parseInt(wrapUl.css('width'));
var wrapH = parseInt(wrapUl.css('height'));
var liW;
var liH;
createDom();

function createDom() {
    liW = wrapW / 5;
    liH = wrapH / 5;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            $('<li><div class="box"><img src = ""></div></li>')
                .css({
                    'width': liW + 'px',
                    'height': liH + 'px',
                    'left': liW * j + 'px',
                    'top': liH * i + 'px',
                    'transform': 'scale(0.9) rotate(' + (Math.random() * 40 - 20) + 'deg)' +
                        'translateX(' + (30 * j - 60) + 'px)' +
                        'translateY(' + (30 * i - 60) + 'px)' + 'translateZ(-' + Math.random() * 500 + 'px)'
                })
                .find('img').attr('src', 'img/pic' + (i * 5 + j) + '.jpg')
                .end()
                .appendTo(wrapUl);
        }
    }
    bindEvent();
}

function bindEvent() {
    var change = true;
    wrapUl.find('li').on('click', function () {
        if (change) {
            var bgImg = $(this).find('img');
            var bgLeft = 0;
            var bgTop = 0;
            $('li').each(function (index) {
                var $this = $(this);
                $this.delay(10 * index).animate({ 'opacity': 0 }, 200, function () {
                    $this.css({
                        'transform': 'rotate(0deg)' + 'translateX(0)' + 'translateY(0)'
                    });
                    $this.find('div').css({
                        'transform': 'scale(1)',
                    });
                    $this.find('img').attr('src', bgImg.attr('src')).css({
                        'position': 'absolute',
                        'height': wrapH + 'px',
                        'width': wrapW + 'px',
                        'left': -bgLeft,
                        'top': -bgTop,
                    });
                    $('ul').css({
                        'overflow': 'hidden'
                    })
                    bgLeft += liW;
                    if (bgLeft >= wrapW) {
                        bgTop += liH;
                        bgLeft = 0;
                    }
                    $this.animate({ 'opacity': 1 }, 200);
                })
            });
            change = false;
        } else {
            $('li').each(function (index) {
                var c = index % 5;
                var r = parseInt(index / 5);
                var $this = $(this);
                $(this).animate({
                    'opacity': 0,
                }, 200, function () {
                    $this.find('img').css({
                        'height': 100 + '%',
                        'width': 100 + '%',
                        'left': 0 + 'px',
                        'top': 0 + 'px',
                        'position': 'absolute',
                    })
                    $this.find('img').attr('src', 'img/pic' + index + '.jpg')

                    $this.css({
                        'transform': 'rotate(' + (Math.random() * 40 - 20) + 'deg)' +
                            'translateX(' + (30 * c - 60) + 'px)' +
                            'translateY(' + (30 * r - 60) + 'px)' + 'translateZ(-' + Math.random() * 500 + 'px)',
                        'height': 30 + 'px',
                        'width': 40 + 'px',
                    });
                    $this.find('div').css({
                        'transform': 'scale(0.9)'
                    });
                    $('ul').css({
                        'overflow': 'visible'
                    })

                    $this.animate({
                        "opacity": 1,
                        'height': liH + 'px',
                        'width': liW + 'px',
                    }, 1200);

                })
            })
            change = true;
        }
    })
}