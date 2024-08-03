
设置元素属性 draggable=true 即可让元素能够拖放

拖放源：被拖放的元素

拖放目标：被拖放的元素到达的目标元素

拖放源事件：

- dragstart：拖放源开始被拖放时触发
- drag：拖放源被拖放的过程中触发
- dragend：拖放源在拖放结束时触发

拖放目标事件：

- dragenter：拖放源进入元素边界时触发
- dragleave：拖放源离开元素边界时触发
- dragover：拖放源在元素内部时不断被触发
- drop：拖放源被释放到元素内部时触发

dataTransfer是拖放事件对象中的一个属性，其中保存了跟拖放相关的信息，它的字符串属性dropEffect，可以设置鼠标在拖放目标中的样式，可设置的值为：

- copy
- move
- link
- none

