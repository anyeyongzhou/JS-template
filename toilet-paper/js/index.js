// 封装 DOM 查询方法
// HTML5 提供了新的 DOM 节点查询方法
// querySelector 和 querySelectorAll 允许使用 CSS 语法（选择器语法）
// document.querySelector() 返回第一个符合要求的
// document.querySelectorAll() 返回所有符合条件

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// 默认的便笺纸内容
var contents = ['超市买卫生纸', '写作业']
var itemWidth = 300;
var itemHeight = 400;

// 获取 DOM 节点
var container = $('.container');

/**
 * 
 * @param {起始值} start 
 * @param {结束} end 
 * Math.floor(Math.random() * 可能性数 + 第一个可能值)
 * 1-10
 * Math.floor(Math.random() * 10 + 1)
 * 56-137
 * Math.floor(Math.random() * (137 - 56 + 1) + 56)
 */
function random(start, end){
    return Math.floor(Math.random() * (end - start + 1) + start);
}


/**
 * 
 * @param {要渲染的便笺纸的内容（字符串）} item 
 */
function render(item) {
    // 1. 我们的便笺纸的 left 和 top 值是随机的，所以首先我们第一步就是要生成随机的 left 和 top 值
    var left = random(0, container.offsetWidth - itemWidth);
    var top = random(0, container.offsetHeight - itemHeight);

    // `` 是 ES6 新提供的字符串模板语法，最大的特点是能够解析变量
    // ESC 键下面那个
    // var name = "xiejie"
    // console.log("Hello, " + name); // Hello, xiejie
    // console.log(`Hello,${name}`); // Hello, xiejie

    container.innerHTML += `
        <div class="item" style="left:${left}px;top:${top}px;">
            <div class="title">
                <div>便笺</div>
                <div class="slideup">-</div>
            </div>
            <div class="content" contenteditable="true">${item}</div>
            <div class="control">
                <div class="newItem">新建便笺</div>
                <div class="removeItem">删除便笺</div>
            </div>
        </div> 
    `;
}

/**
 * 
 * @param {要添加过渡效果的节点} node 
 */
function applyTransition(node){
    node.style.transition = "all .5s";
    // 上面虽然添加了过渡，但是当过渡效果结束后，我会把这个过渡效果删除掉
    node.ontransitionend = function(){
        // 该事件会在过渡效果结束后触发
        node.style.transition = "none";
    }
}

/**
 * 绑定事件
 */
function bindEvent(){
    // 思考：有哪些事件？
    // 1. 新建便笺  2. 删除便笺 3. 便笺最小化   4. 便笺的移动   5. 便笺的最上层显示
    // 事件委托
    container.onclick = function(e){

        // 拿到便笺纸容器 div.item
        // 但是这里要注意，不一定拿到的是便笺纸容器
        var itemNode = e.target.parentNode.parentNode;

        // 这里我们根据 class 不同的值就能知道用户要做什么事情
        switch(e.target.className){
            case 'slideup' : {
                if(e.target.innerHTML === '-'){
                    // 折叠
                    itemNode.style.height = "40px";
                    e.target.innerHTML = "+";
                    applyTransition(itemNode);
                } else {
                    // 说明是展开
                    // 展开这边就又有判断了
                    if(parseInt(itemNode.style.top) > container.offsetHeight - itemHeight){
                        // 进入此 if，说明从上往下展开高度不够
                        // 所以我们由下往上
                        itemNode.style.top = parseInt(itemNode.style.top) - itemHeight + "px"
                    }
                    itemNode.style.height = "400px";
                    e.target.innerHTML = "-";
                    applyTransition(itemNode);
                }
                break;
            }
            case "newItem":{
                // 说明是新建便笺
                render("");
                break;
            }
            case "removeItem":{
                // 删除
                if(window.confirm("是否要删除此便笺？")){
                    container.removeChild(itemNode);
                }
                break;
            }
        }
    }

    // 做便笺纸的拖动
    container.onmousedown = function(e){
        if(e.target.className === "title"){
            // 进入此 if，说明用户是在 div.title 这个 div 上面按下的鼠标
            document.onmousemove = function(ev){
                // 首先，我们先获取到便笺纸容器
                var itemNode = e.target.parentNode;

                // 移动便笺纸其实就是不停的改变 div.item 的 left 和 top 值
                itemNode.style.left = ev.clientX - e.offsetX + "px";
                itemNode.style.top = ev.clientY - e.offsetY + "px";

                // 拖动的时候做一下边界判断
                if(parseInt(itemNode.style.left) <= 0){
                    // 左边界
                    itemNode.style.left = "0px"
                }
                if(parseInt(itemNode.style.left) >= container.offsetWidth - itemWidth){
                    // 右边界
                    itemNode.style.left = container.offsetWidth - itemWidth + "px"
                }
                if(parseInt(itemNode.style.top) <= 0){
                    // 上边界
                    itemNode.style.top = "0px"
                }
                // 下边界有两种情况
                if(e.target.children[1].innerHTML === '-'){
                    // 便笺纸是展开的
                    if(parseInt(itemNode.style.top) >= container.offsetHeight - itemHeight){
                        itemNode.style.top = container.offsetHeight - itemHeight + "px"
                    }
                } else {
                    // 便笺纸是折叠的
                    if(parseInt(itemNode.style.top) >= container.offsetHeight - 40){
                        itemNode.style.top = container.offsetHeight - 40 + "px"
                    }
                }
              
               

            }
            document.onmouseup = function(){
                document.onmousemove = null;
            }
        }
    }
}

function main() {
    // 1. 渲染默认的便笺纸内容
    for (var i = 0; i < contents.length; i++) {
        render(contents[i]);
    }

    // 2. 绑定事件
    bindEvent();
}
main();