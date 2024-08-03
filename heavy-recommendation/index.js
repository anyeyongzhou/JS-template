var imgsDOM = document.getElementById("imgs");
var sideBarDOM = document.getElementById("side-bar");

var imgsDom = [];
var navDom = [];
var activeImg = null;
var activeNav = null;

for (let i = 0; i < data.length; i++) {
  var item = data[i];
  var tagA = document.createElement("a");
  tagA.setAttribute("href", "#");
  tagA.style.backgroundColor = item.bg;
  tagA.style.backgroundImage = "url(" + item.img + ")";
  imgsDOM.appendChild(tagA);
  imgsDom.push(tagA);

  var tagNav = document.createElement("a");
  tagNav.setAttribute("class", "nav");
  tagNav.setAttribute("href", "#");
  tagNav.setAttribute("title", item.title + ":" + item.desc);
  tagNav.innerHTML = "<span>" + item.title + "</span>" + item.desc;
  sideBarDOM.appendChild(tagNav);
  navDom.push(tagNav);

  if (i === 0) {
    tagA.setAttribute("class", "active");
    tagNav.setAttribute("class", "active");
    activeImg = tagA;
    activeNav = tagNav;
  }

  tagNav.onmouseenter = (function (tagA, tagNav) {
    return function () {
      clearInterval(t);
      activeNav.setAttribute("class", "nav");
      activeImg.setAttribute("class", "");

      tagA.setAttribute("class", "active");
      tagNav.setAttribute("class", "active");
      activeImg = tagA;
      activeNav = tagNav;
    };
  })(tagA, tagNav);

  tagNav.onmouseleave = function () {
    t = setInterval(move, 3000);
  };
}

var t = setInterval(move, 3000);

function move() {
  activeNav.setAttribute("class", "nav");
  activeImg.setAttribute("class", "");

  var index = imgsDom.indexOf(activeImg);
  if (index === data.length - 1) {
    activeNav = navDom[0];
    activeImg = imgsDom[0];
  } else {
    activeNav = navDom[index + 1];
    activeImg = imgsDom[index + 1];
  }

  activeNav.setAttribute("class", "active");
  activeImg.setAttribute("class", "active");
}
