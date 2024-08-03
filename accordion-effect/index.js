var titles = document.querySelectorAll(".menu h2");

for (let i = 0; i < titles.length; i++) {
  titles[i].onclick = function () {
    var beforeOpend = document.querySelector(".submenu[status=opended]");
    if (beforeOpend) {
      closeSubmenu(beforeOpend);
    }
    toggleSubmenu(this.nextElementSibling);
  };
}

var itemHeight = 30;

var totalMS = 1000;

function openSubmenu(subMenu) {
  var status = subMenu.getAttribute("status");
  if (status !== "closed" && status) {
    return;
  }
  subMenu.setAttribute("status", "playing");
  createAnimation({
    from: 0,
    to: itemHeight * subMenu.children.length,
    totalMS: totalMS,
    onmove: function (n) {
      subMenu.style.height = n + "px";
    },
    onend: function () {
      subMenu.setAttribute("status", "opended");
    },
  });
}

var testMenu = document.querySelector(".submenu");

function closeSubmenu(subMenu) {
  var status = subMenu.getAttribute("status");
  if (status !== "opended") {
    return;
  }
  subMenu.setAttribute("status", "playing");
  createAnimation({
    from: itemHeight * subMenu.children.length,
    to: 0,
    totalMS: totalMS,
    onmove: function (n) {
      subMenu.style.height = n + "px";
    },
    onend: function () {
      subMenu.setAttribute("status", "closed");
    },
  });
}

function toggleSubmenu(subMenu) {
  var status = subMenu.getAttribute("status");
  if (status == "playing") {
    return;
  } else if (status === "opended") {
    closeSubmenu(subMenu);
  } else {
    openSubmenu(subMenu);
  }
}
