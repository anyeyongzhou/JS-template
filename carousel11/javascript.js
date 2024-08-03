window.onload = function(){

    var banner = document.querySelector(".banner")
    var ul = document.querySelector("ul");
    var ul_li = ul.querySelectorAll("li");
    var ol = document.querySelector("ol");
    var ol_li = ol.querySelectorAll("li");
    var prev = document.querySelector("#prev");
    var next = document.querySelector("#next");
    // 创建一个下标值
    var index = 0;
    var timer;
    var val = 0;
    // 获取一个图片的宽度
    var liW = ul_li[0].offsetWidth;
    // console.log(liW);
    // 定义一个开关
    var bool = true;

    var timer1;

    next.onclick = function(){
        if(bool){
            bool = false;
            index++;
            if(index>ul_li.length-1){
                index = 1;
                ul.style.left = 0;
            }
            // console.log(index);
            run(ul,-index*liW);
            
            val++;
            val = index;
            if(val>ol_li.length-1){
                val = 0;
            }
            for(var i=0;i<ol_li.length;i++){
                ol_li[i].className = "";
            }
            ol_li[val].className = "active";
        }
        
    }

    prev.onclick = function(){
        if(bool){
            bool = false;
            index--;
            if(index<0){
                index = ul_li.length-2;
                ul.style.left = -(ul_li.length-1)*liW+"px";
            }
            run(ul,-index*liW);

            val--;
            val = index;
            if(val<0){
                val = ol_li.length-1;
            }
            for(var i=0;i<ol_li.length;i++){
                ol_li[i].className = "";
            }
            ol_li[val].className = "active";
        }
        
    }

    var bian = function(){
        if(bool){
            bool = false;
            index++;
            if(index>ul_li.length-1){
                index = 1;
                ul.style.left = 0;
            }
            // console.log(index);
            run(ul,-index*liW);
            
            val++;
            val = index;
            if(val>ol_li.length-1){
                val = 0;
            }
            for(var i=0;i<ol_li.length;i++){
                ol_li[i].className = "";
            }
            ol_li[val].className = "active";
        }
    }

    timer1 = setInterval(bian,4000);

    banner.onmouseover = function(){
        clearInterval(timer1)
    }
    banner.onmouseout = function(){
        timer1 = setInterval(bian,4000);
    }


    // 圆点点击事件
    for(var i=0;i<ol_li.length;i++){
        // 手动保存变化的i值
        ol_li[i].zhi = i;
        ol_li[i].onclick = function(){
            // console.log(this.zhi);
            index = this.zhi;
            for(var j=0;j<ol_li.length;j++){
                ol_li[j].className = "";
            }
            this.className = "active";
            run(ul,-index*liW);
        }
    }


    function run(ele,seat){
        clearInterval(timer);
        timer = setInterval(function(){
            // 获取初始位置
            var start = ele.offsetLeft;
            var step = (seat-start)/15;
            // step = Math.floor(step);
            if(step>0){
                step = Math.ceil(step);
            }else{
                step = Math.floor(step)
            }
            if(step==0){
                bool = true;
            }
            // step = Math.ceil(step);
            start = start+step;
            ele.style.left = start +"px";
            // console.log(start);
            // console.log(step);
        },20)
    }

    // console.log(Math.ceil(-0.5))
    // -0.5

    // 1000   100
    // 900    90
    // 810    81

}