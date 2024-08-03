var lis = document.querySelectorAll('#wrap li');
var as = document.querySelectorAll('#wrap a');
var headPos = [];   //存储每张图片的坐标

var style = document.querySelector('style');
var str = '';

//动态的给每一张图片都添加8个方向的样式
for (var i = 0; i < lis.length; i++) {
    str += `#wrap li:nth-child(${i + 1}) a{
        background: url(images/img_${i + 1}.jpg) no-repeat 0 0;
    }
    #wrap li:nth-child(${i + 1}) a.n{	
        background: url(images/img_${i + 1}.jpg) no-repeat -430px 0;
    }
    #wrap li:nth-child(${i + 1}) a.s{	
        background: url(images/img_${i + 1}.jpg) no-repeat -688px 0;
    }
    #wrap li:nth-child(${i + 1}) a.w{	
        background: url(images/img_${i + 1}.jpg) no-repeat -860px 0;
    }
    #wrap li:nth-child(${i + 1}) a.e{	
        background: url(images/img_${i + 1}.jpg) no-repeat -258px 0;
    }
    #wrap li:nth-child(${i + 1}) a.f{	
        background: url(images/img_${i + 1}.jpg) no-repeat -86px 0;
    }
    #wrap li:nth-child(${i + 1}) a.ne{	
        background: url(images/img_${i + 1}.jpg) no-repeat -344px 0;
    }
    #wrap li:nth-child(${i + 1}) a.se{	
        background: url(images/img_${i + 1}.jpg) no-repeat -602px 0;
    }
    #wrap li:nth-child(${i + 1}) a.sw{	
        background: url(images/img_${i + 1}.jpg) no-repeat -774px 0;
    }
    #wrap li:nth-child(${i + 1}) a.nw{	
        background: url(images/img_${i + 1}.jpg) no-repeat -516px 0;
    }`;

    //把每张图片的中心位置存储下来，为了与鼠标的位置形成一个角度
    headPos.push({
        x: lis[i].getBoundingClientRect().left + lis[i].offsetWidth / 2,
        y: lis[i].getBoundingClientRect().top + lis[i].offsetHeight / 2,
    });

    //当鼠标移入图片身上后，给他添加一个标识，用于处理正前方的情况
    lis[i].onmouseenter = function () {
        this.mouse = true;
    }
    lis[i].onmouseleave = function () {
        this.mouse = false;
    }
}

style.innerHTML += str;


//获取角度
function getRotate(obj, mouse) {
    var diffX = mouse.x - obj.x;
    var diffY = mouse.y - obj.y;

    //atan2它可以直接通过两个直角边得到对应的角度值，但是这个值是0-180，与-180-0之间的弧度
	//Math.PI/180		弧度转成角度（弧度除以它）
    return Math.atan2(diffY, diffX) / (Math.PI / 180);
}

//console.log(getRotate({x:0,y:0},{x:40,y:24}));

//鼠标移动事件
var cl = '';
document.onmousemove = function (ev) {
    for (var i = 0; i < as.length; i++) {
        var rotate = getRotate(headPos[i], { x: ev.clientX, y: ev.clientY });

        //右
        if (-10 < rotate && rotate < 10) {
            cl = 'e';
        }

        //右下
        if (10 < rotate && rotate < 80) {
            cl = 'se';
        }

        //下
        if (80 < rotate && rotate < 100) {
            cl = 's';
        }

        //左下
        if (100 < rotate && rotate < 170) {
            cl = 'sw';
        }

        //左
        if ((170 < rotate && rotate < 180) || (-180 < rotate && rotate < -170)) {
            cl = 'w';
        }

        //左上
        if (-170 < rotate && rotate < -100) {
            cl = 'nw';
        }

        //上
        if (-100 < rotate && rotate < -80) {
            cl = 'n';
        }

        //右上
        if (-80 < rotate && rotate < -10) {
            cl = 'ne';
        }

        if(lis[i].mouse){
            as[i].className='f';
        }else{
            as[i].className=cl
        }

       // as[i].className = lis[i].mouse ? 'f' : cl;
    }
}