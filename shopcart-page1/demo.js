var rightBox = $('.rightBox'),
    tbody = $('.bodyBox'),
    totalMoney = $('.totalMoney'),
    addShop = $('.addShop');
var obj = {
    money: 0,
    name: '',
    data: [],
    totalM: 0
}
bindEvent();
function bindEvent() {
    addShop.on('click', function () {
        rightBox.css('display', 'block');
        obj.money = $(this).siblings('.money').html();
        obj.name = $(this).siblings('.name').html();
        addJson();
        addHtml();
    })
}
function addJson() {
    var data = obj.data;
    for (var j = 0; j < data.length; j++) {
        if (data[j].name == obj.name) {
            data[j].num++;
            return;
        }
    }
    data.push({
        name: obj.name,
        money: obj.money,
        num: 1
    })
}

function addHtml() {
    var data = obj.data;
    var totalM = obj.totalM;
    var textHtml = '';
    tbody.html('');
    for (var i = 0; i < data.length; i++) {
        textHtml += '<tr><td>' + data[i].name + '</td>\
                <td>'+ data[i].money + '</td><td>\
                    <a href="#" class="reduce">-</a>'+ data[i].num + ' ' + '\
            <a href="#" class="addNum">+</a>\
                </td><td>￥'+ (data[i].num * data[i].money).toFixed(2) + '</td></tr>'
        totalM += data[i].num * data[i].money;
        totalMoney.text('￥' + totalM.toFixed(2));
    }
    tbody.append(textHtml);
    bindSign();
}
function bindSign(){
    var data = obj.data;
    $('.addNum').on('click',function(){
        var index = $(this).parents('tr').index();
        data[index].num ++;
        addHtml();
    })
    $('.reduce').on('click',function(){
        var index = $(this).parents('tr').index();
        data[index].num --;
        if(data[index].num == 0){
            data.splice(index,1);
        }        
        if(data.length == 0){
            totalMoney.text(0);
            rightBox.css('display','none');
        }
        addHtml();
    })
}