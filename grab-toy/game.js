var toyContainer = document.querySelector(".toys");
var config = {
    containerWidth: 470,
    toyWidth: 200,
    clawMaxHeight: 350,
    clawMinHeight: 80
}
var toys = [];

function createToy(left) {
    var dom = document.createElement("div");
    var timer = null;
    toyContainer.appendChild(dom);
    var toy = {
        left: left,
        dom: dom,
        show: function () {
            this.dom.style.left = this.left + "px";
        },
        autoMove: function () {
            clearInterval(timer);
            var that = this;
            timer = setInterval(function () {
                that.left++;
                that.show();
                if (that.left > config.containerWidth) {
                    that.remove();
                    clearInterval(timer);
                }
            }, 8);
        },
        remove: function () {
            this.dom.remove();
            var i = toys.indexOf(this);
            toys.splice(i, 1);
            var first = toys[0];
            var newToy = createToy(first.left - config.toyWidth);
            toys.unshift(newToy);
        },
        canBeCatch: function () {
            if (this.left >= 110 && this.left <= 170) {
                return true;
            }
            return false;
        },
        catched: function () {
            clearInterval(timer);
            this.dom.style.transition = "transform 1s linear";
            this.dom.style.zIndex = 1;
            this.dom.style.transform = `translate(0, -250px)`;
            var that = this;
            setTimeout(() => {
                that.remove();
            }, 1000);
        }
    }
    toy.show();
    toy.autoMove();
    toys.push(toy);
    return toy;
}

function init() {
    var initNumber = 5;
    for (i = 0; i < initNumber; i++) {
        createToy((i - initNumber) * config.toyWidth)
    }
}

init();

var claw = {
    dom: document.querySelector(".claw"),
    moveDown: function () {
        this.dom.style.height = config.clawMaxHeight + "px";
        setTimeout(() => {
            this.dom.classList.remove("open");
            this.catchToy();
            this.moveUp();
        }, 1000);
    },
    moveUp: function () {
        this.dom.style.height = config.clawMinHeight + "px";
        setTimeout(() => {
            this.dom.classList.add("open");
        }, 1000);
    },
    catchToy: function () {
        for (const t of toys) {
            if (t.canBeCatch()) {
                t.catched();
                return;
            }
        }
    }
}

var button = document.querySelector(".button");
button.onclick = function () {
    if (this.classList.contains("down")) {
        return;
    }
    this.classList.add("down");
    claw.moveDown();
    setTimeout(() => {
        this.classList.remove("down");
    }, 2000);
}