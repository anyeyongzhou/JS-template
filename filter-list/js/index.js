(function () {
  /* 
  定义入口文件
  事件绑定，处理单选全选按钮
   */
  /* 获取当前的选择按钮 */
  var rightArrow = document.querySelector('.right-arrow')
  var leftArrow = document.querySelector('.left-arrow')

  var init = function () {
    initEvent();
  }

  /* 事件函数 */
  var initEvent = function () {
    /* 选中所有事件绑定 */
    document.querySelectorAll('.check-all').forEach(function (node) {
      node.addEventListener('click', onCheckAllClick)
    })
    /* 单个列表项事件绑定 */
    document.querySelectorAll('.check-one').forEach(function (node) {
      node.addEventListener('click', onCheckOneClick)
    })
    /* 移动箭头点击事件 */
    document.querySelectorAll('.arrow').forEach(function (node) {
      node.addEventListener('click', onArrowClick)
    })
  }

  /* 箭头点击事件 */
  /* 第一版代码 */
  /*   const onArrowClick = function () {
      if (this.classList.contains('left-arrow')) {
        if (!getCheckedAmount('left')) return
        document.querySelector('.left-roster').querySelectorAll('.roster-item').forEach(function (node) {
          if (node.querySelector('.check-one').checked) {
            document.querySelector('.right-roster').appendChild(node)
            node.querySelector('.check-one').checked = false
          }
        })
        if (!document.querySelector('.left-roster').children.length) {
          console.log(document.querySelector('.left-title'))
          document.querySelector('.left-title').checked = false
        }
      } else {
        if (!getCheckedAmount('right')) return
        document.querySelector('.right-roster').querySelectorAll('.roster-item').forEach(function (node) {
          if (node.querySelector('.check-one').checked) {
            document.querySelector('.left-roster').appendChild(node)
            node.querySelector('.check-one').checked = false
          }
        })
        if (!document.querySelector('.right-roster').children.length) {
          document.querySelector('.right-title').checked = false
        }
      }
    } */

  const onArrowClick = function () {
    /* 判断左右箭头 */
    if (this.classList.contains('left-arrow')) {
      /* 移动选定项 */
      if (!getCheckedAmount('left')) return
      moveRoster('left', 'right');
    } else {
      if (!getCheckedAmount('right')) return
      moveRoster('right', 'left');
    }
    this.classList.remove('active');
  }

  /* 移动选定项函数 */
  var moveRoster = function (currentDirection, againstDirection) {
    document.querySelector('.' + currentDirection + '-roster').querySelectorAll('.roster-item').forEach(function (node) {
      if (node.querySelector('.check-one').checked) {
        document.querySelector('.' + againstDirection + '-roster').appendChild(node)
        node.querySelector('.check-one').checked = false
      }
    })
    if (!document.querySelector('.' + currentDirection + '-roster').children.length) {
      document.querySelector('.' + currentDirection + '-title').checked = false
    }
  }

  /* 全部选中 */
  var onCheckAllClick = function () {
    var currentStatus = this.checked
    /* 找到所有的当前列表下的单选内容，调整当前内容的selected状态 */
    this.parentNode.parentNode.parentNode.querySelector('.roster-container').querySelectorAll('.check-one').forEach(function (node) {
      node.checked = currentStatus
    })
    /* 判断是否显示高亮样式 */
    checkIsNeedHighlight()
  }

  /* 判断是否显示高亮样式 */
  var checkIsNeedHighlight = function () {
    getCheckedAmount('left') ? leftArrow.classList.add('active') : leftArrow.classList.remove('active')
    getCheckedAmount('right') ? rightArrow.classList.add('active') : rightArrow.classList.remove('active')
  }

  /* 获取选中的列表项 */
  var getCheckedAmount = function (direction) {
    var selectedAmount = 0
    document.querySelector('.' + direction + '-roster').querySelectorAll('.check-one').forEach(function (node) {
      node.checked && (selectedAmount += 1)
    })
    return selectedAmount
  }

  /* 单独选中 */
  var onCheckOneClick = function () {
    const checkAll = this.parentNode.parentNode.parentNode.parentNode.querySelector('.check-all')
    var currentRosterList = this.parentNode.parentNode.parentNode.querySelectorAll('.check-one')
    var checkLength = 0
    currentRosterList.forEach(function (node) {
      node.checked && (checkLength += 1)
    })
    checkAll.checked = checkLength === currentRosterList.length
    checkIsNeedHighlight()
  }

  init();
})()