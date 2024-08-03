var provinceDOM = document.getElementById("province");
var cityDOM = document.getElementById("city");
var schoolDOM = document.getElementById("school");

appendOption(provinceData, provinceDOM);

provinceDOM.onchange = function () {
  cityChange();
  schoolChange();
};

cityDOM.onchange = function () {
  schoolChange();
};

function cityChange() {
  cityDOM.innerHTML = "";
  var p = provinceDOM.value;
  var cityObj = cityData[p];
  appendOption(cityObj, cityDOM);
}

function schoolChange() {
  schoolDOM.innerHTML = "";
  var c = cityDOM.value;
  var schoolObj = allschoolData[c];
  appendOption(schoolObj, schoolDOM, false);
}

function appendOption(data, dom, flag = true) {
  for (const prop of data) {
    var optionDOM = document.createElement("option");
    optionDOM.value = prop[flag ? 0 : 2];
    optionDOM.innerHTML = prop[flag ? 1 : 2];
    dom.appendChild(optionDOM);
  }
}
