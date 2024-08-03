var selYear = document.getElementById("selYear") //年的下拉列表
var selMonth = document.getElementById("selMonth") //月的下拉列表
var divContent = document.getElementById("content");
/**
 * 初始化下拉列表
 */
function initSelects() {
    for (var i = 1919; i <= 2119; i++) {
        var opt = document.createElement("option");
        opt.innerText = i;
        opt.value = i;
        selYear.appendChild(opt);
    }

    for (var i = 1; i <= 12; i++) {
        var opt = document.createElement("option");
        opt.innerText = i;
        opt.value = i;
        selMonth.appendChild(opt);
    }
}

/**
 * 选中今天
 */
function chooseToday() {
    var d = new Date(); //获取当前日期
    selYear.value = d.getFullYear();
    selMonth.value = d.getMonth() + 1;
}

/**
 * 根据两个下拉列表当前选中的值，设置日历内容部分
 */
function setContent() {
    var year = +selYear.value; // 当前选中的年
    var month = +selMonth.value; // 当前选中的月
    divContent.innerHTML = ""; //清空
    //1. 塞一些空白的span元素
    // 塞几个？
    var num = getDayOfWeek() - 1; //1号是星期几 - 1
    for (var i = 0; i < num; i++) {
        var span = document.createElement("span");
        divContent.appendChild(span);
    }
    //2. 塞一些带数字的span元素
    // 这个月有几天？
    var d = new Date(year, month, 0); //得到下一个月的昨天：这个月的最后一天
    var num = d.getDate();
    var today = new Date(); //得到今天的日期对象
    for (var i = 1; i <= num; i++) {
        var span = document.createElement("span");
        span.innerText = i;
        if (today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === i) {
            span.className = "today";
        }
        divContent.appendChild(span);
    }

    /**
     * 获取当前选中的月的1号是星期几，星期日按照7来计算
     */
    function getDayOfWeek() {
        var d = new Date(year, month - 1)
        var num = d.getDay(); //得到星期几，星期日认为是0
        if (num === 0) { //星期天
            num = 7;
        }
        return num;
    }
}

initSelects();
chooseToday();
setContent();

selYear.onchange = selMonth.onchange = setContent;

var btnToday = document.getElementById("btnToday")
btnToday.onclick = function(){
    chooseToday();
    setContent();
}