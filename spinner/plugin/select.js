//找到所有具有自定义属性beauty的select元素
var sels = document.querySelectorAll("select[beauty]")

for (var i = 0; i < sels.length; i++) {
    //对每一个select元素进行处理
    selectBeauty(sels[i]);
}

/**
 * 美化一个select元素
 */
function selectBeauty(sel) {
    //1. 隐藏select元素
    sel.style.display = "none";
    //2. 创建div，添加到对应的位置
    var div = document.createElement("div");
    div.className = "select-beauty";

    //3. 创建一个div，用于显示选中的值
    var divSelected = document.createElement("div");
    divSelected.className = "selected";
    div.appendChild(divSelected);

    //4. 创建一个ul，用于显示列表
    var ul = document.createElement("ul");
    ul.className = "list";
    //添加li
    for (var i = 0; i < sel.options.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("value", sel.options[i].value);
        li.innerText = sel.options[i].innerText;
        ul.appendChild(li);
    }
    div.appendChild(ul);


    //设置该div的内容
    setSelected();
    //5. 注册事件
    divSelected.onclick = function () {
        // 如果有，就去掉，如果没有，就加上
        div.classList.toggle("expand");
    }

    ul.onclick = function (e) {
        if (e.target.tagName === "LI") {
            var li = e.target;
            var value = li.value;
            sel.value = value;
            setSelected();
        }
    }

    sel.parentNode.insertBefore(div, sel)


    /**
     * 设置选中的文本
     */
    function setSelected() {
        //得到下拉列表的选中文本
        var opt = sel.selectedOptions[0]; //得到的是选中的option元素
        var text = opt.innerText;
        divSelected.innerHTML = "<div class=\"content\">" + text + "</div><i class=\"iconfont icon-shangjiantou\"></i>";

        //如何找到对应的li
        //找到之前选中的li，清除样式
        var li = ul.querySelector("li.active");
        if (li) {
            li.className = "";
        }

        li = ul.querySelector("li[value='" + opt.value + "']")
        li.classList.add("active");
    }
}

