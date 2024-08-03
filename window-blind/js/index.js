// 获取 DOM 元素
var wrap = document.getElementById('wrap');
var btnGrounp = document.getElementById('btnGrounp');

// 计算 li 的个数
var liLength = wrap.offsetWidth / 40;


/**
 * 初始化函数
 */
function init() {
    // 主要就是要生成 li
    for (var i = 0; i < liLength; i++) {
        // 每个 li 下面有 4 个 span
        // 代表 4 个面
        wrap.innerHTML += `
            <li style="transition:.8s ${i*50}ms">
                <span style="background-position:${-i * 40}px 0"></span>
                <span style="background-position:${-i * 40}px 0"></span>
                <span style="background-position:${-i * 40}px 0"></span>
                <span style="background-position:${-i * 40}px 0"></span>
            </li>
        `;
    }
}

// `` 是 ES6 提供的字符串模板
// var stuname = "xiejie";
// console.log("Hello," + stuname + ",早上好");
// console.log(`Hello,${stuname},早上好`); // Hello,xiejie,早上好

/**
 * 绑定事件
 */
function bindEvent(){
    // 给 btnGrounp 绑定事件，采用事件委托
    btnGrounp.addEventListener('click', function(e){
        var index = e.target.dataset.id;
        var lis = wrap.children; // 获取所有的 li
        var btns = btnGrounp.children; // 获取所有的 btn
        for(var i=0;i< liLength;i++){
            lis[i].style.transform = `rotateX(${index * -90}deg)`
        }
        for(var i=0;i< btns.length;i++){
            btns[i].className = "";
        }
        btns[index].className = "active";
    });
}

/**
 * 主函数
 */
function main(){
    // 1. 初始化
    init();

    // 2. 绑定事件
    bindEvent();
}

main();