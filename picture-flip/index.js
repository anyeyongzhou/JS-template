var oLi = $('li');
var arr = [];
init();

function init() {
    Array.prototype.slice.call(oLi, 0).forEach(function (ele, index) {
        arr.push({
            w: ele.offsetWidth,
            h: ele.offsetHeight,
            l: ele.offsetLeft,
            t: ele.offsetTop
        })
        bindEvent(ele, index);
    })
    console.log(arr);
}

function bindEvent(item, index) {
    $(item).on('mouseenter', function (e) {
        addClass(e, item, 'in', index);
    })
    $(item).on('mouseleave', function (e) {
        addClass(e, item, 'out', index);
    })
}

function addClass(e, item, state, index) {
    var d = getD(e, index);
    var str = '';
    switch (d) {
        case 0:
            str = '-top';
            break;
        case 1:
            str = '-right';
            break;
        case 2:
            str = '-bottom';
            break;
        case 3:
            str = '-left';
            break;
    }
    item.className = '';
    item.classList.add(state + str);
}

function getD(e, index) {
    var w = arr[index].w,
        h = arr[index].h,
        x = e.pageX - arr[index].l - w / 2,
        y = e.pageY - arr[index].t - h / 2;
    d = (Math.round(((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    console.log(d);
    return d;
}
