var blockLen = 45;
var container = document.querySelector(".game");
/**
 * 0. 空白
 * 1. 玩家
 * 2. 墙
 * 3. 箱子
 */
var map = [
    [0, 0, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 2, 0, 1, 0, 2, 0, 0],
    [0, 0, 2, 0, 3, 0, 2, 0, 0],
    [2, 2, 2, 0, 0, 0, 2, 2, 2],
    [2, 0, 0, 0, 3, 0, 0, 0, 2],
    [2, 0, 3, 3, 3, 3, 3, 0, 2],
    [2, 0, 0, 0, 3, 0, 0, 0, 2],
    [2, 2, 2, 3, 3, 3, 2, 2, 2],
    [0, 0, 2, 0, 0, 0, 2, 0, 0],
    [0, 0, 2, 0, 3, 0, 2, 0, 0],
    [0, 0, 2, 0, 0, 0, 2, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0]
];

var player = {
    x: 4,
    y: 1
}

var correct = [
    { x: 4, y: 3 },
    { x: 4, y: 4 },
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
    { x: 5, y: 5 },
    { x: 6, y: 5 },
    { x: 4, y: 6 },
    { x: 4, y: 7 },
    { x: 4, y: 8 },
    { x: 4, y: 9 },
    { x: 4, y: 10 }
];

function isCorrect(x, y) {
    return correct.find(item => item.x === x && item.y === y) !== undefined;
}

function createDom(number, x, y) {
    var div = document.createElement("div");
    div.style.width = blockLen + "px";
    div.style.height = blockLen + "px";
    div.style.position = "absolute";
    div.style.left = x * blockLen + "px";
    div.style.top = y * blockLen + "px";
    div.style.boxSizing = "border-box";
    div.style.backgroundSize = "100% 100%";
    if (number === 0) {
        if (isCorrect(x, y)) {
            div.style.border = "2px solid lightgreen";
        }
    }
    else if (number === 1) {
        div.style.backgroundImage = `url("imgs/player.png")`;
    }
    else if (number === 2) {
        div.style.backgroundImage = `url("imgs/wall.jpg")`;
    }
    else if (number === 3) {
        if (isCorrect(x, y)) {
            div.style.backgroundImage = `url("imgs/over_box.png")`;
        }
        else {
            div.style.backgroundImage = `url("imgs/box.png")`;
        }
    }
    container.appendChild(div);
}

function render() {
    container.innerHTML = "";
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            createDom(map[y][x], x, y);
        }
    }
}

function init() {
    container.style.height = map.length * blockLen + "px";
    container.style.width = map[0].length * blockLen + "px";
}
init();
render();

function move(direction) {
    var { x, y } = getNewTarget(direction, player.x, player.y);
    var target = map[y][x];
    if (target === 2) {
        return false;
    }
    else if (target === 0) {
        map[y][x] = 1;
        map[player.y][player.x] = 0;
        player.x = x;
        player.y = y;
        render();
        return true;
    }
    else if (target === 3) {
        return moveBox(direction, x, y);
    }
}

function getNewTarget(direction, initX, initY) {
    var x = initX, y = initY;
    if (direction === "left") {
        x--;
    }
    else if (direction === "right") {
        x++;
    }
    else if (direction === "up") {
        y--;
    }
    else {
        y++;
    }
    return {
        x,
        y
    }
}

function moveBox(direction, boxX, boxY) {
    var { x, y } = getNewTarget(direction, boxX, boxY);
    var target = map[y][x];
    if (target === 0) {
        //可以移动
        map[y][x] = 3;
        map[boxY][boxX] = 1;
        map[player.y][player.x] = 0;
        player.x = boxX;
        player.y = boxY;
        render();
        return true;
    }
    else {
        return false;
    }
}

function isWin() {
    var result = correct.find(item => map[item.y][item.x] !== 3);
    return result === undefined;
}

window.onkeydown = function (e) {
    var result;
    if (e.key === "ArrowUp") {
        result = move("up")
    }
    else if (e.key === "ArrowDown") {
        result = move("down");
    }
    else if (e.key === "ArrowLeft") {
        result = move("left");
    }
    else if (e.key === "ArrowRight") {
        result = move("right");
    }
    if (result && isWin()) {
        window.onkeydown = null;
        document.querySelector(".win").style.display = "flex";
    }
}