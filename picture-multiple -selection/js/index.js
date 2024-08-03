// 下面 li 的点击
document.querySelector(".bottom").onclick = function(e) {
    if(e.target.nodeName === "LI"){
        // 用户点击的是 li 标签
        e.target.className === "selected" ?
        (e.target.className = "") : (e.target.className = "selected")
    }
    // 判断 LI 是否有被选中，如果有，左右的按钮需要挂上 selected 类
    // 如果没有，左右的按钮需要去除 selected 类
    if(document.querySelectorAll(".bottom>li.selected").length){
        document.querySelector(".select").classList.add("selected");
        document.querySelector(".send").classList.add("selected");
    } else {
        document.querySelector(".select").classList.remove("selected");
        document.querySelector(".send").classList.remove("selected");
    }
    // 最后就是 data-counter 要根据 li 的个数产生变化
    document.querySelector(".send").dataset.counter = document.querySelectorAll(".bottom>li.selected").length;
}

// 接下来是左上按钮的点击
document.querySelector(".select").onclick = function(e){
    if(e.target.classList.contains("selected")){
        // 进入此 if，说明原本该按钮上面就已经挂了 selected 样式类
        // 我们要做的操作是去除所有的 selected 样式类
        var lis = document.querySelectorAll(".bottom>li");
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove("selected");
            document.querySelector(".select").classList.remove("selected");
            document.querySelector(".send").classList.remove("selected");
        }
    } else {
        // 所有的添加上 selected 样式类
        var lis = document.querySelectorAll(".bottom>li");
        for(var i=0;i<lis.length;i++){
            lis[i].classList.add("selected");
            document.querySelector(".select").classList.add("selected");
            document.querySelector(".send").classList.add("selected");
        }
        document.querySelector(".send").dataset.counter = document.querySelectorAll(".bottom>li.selected").length;
    }
}