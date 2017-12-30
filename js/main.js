// 定义计算器对象
var calc = {
    currentOperator: null,
    result: '0',
    hasDot: false,
    ops_num: 0,

    initialize: function() {
        this.display();
    },

    transition: function(key_type, keycode) {
        var update_show = true;
        switch (key_type) {
            case 'number':
                if (keycode === '.' && this.hasDot) {
                    update_show = false;
                } else if (this.result === '0' && keycode != '.') {
                    this.result = keycode;
                } else {
                    this.result += keycode;
                }
                break;
            case 'operator':
                if (keycode === '=') {
                    switch (this.currentOperator) {
                        case '+':
                            this.result = parseFloat(this.result) + this.ops_num;
                            break;
                        case '-':
                            this.result = this.ops_num - parseFloat(this.result);
                            break;
                        case '×':
                            this.result = this.ops_num * parseFloat(this.result);
                            break;
                        case '÷':
                            this.result = this.ops_num / parseFloat(this.result);
                            break;
                        default:
                            break;
                    }
                } else {
                    update_show = false;
                    this.ops_num = parseFloat(this.result);
                    this.result = '0';
                    this.currentOperator = keycode;
                }

                break
            case 'special':
                if (keycode === 'C') {
                    this.result = '0';
                    this.currentOperator = null;
                    this.hasDot = false;
                }
                break
            default:
                console.log('Invalid State!');
                break
        }
        if (update_show) {
            this.display();
        }
    },

    display: function() {
        if (this.result.toString().length > 11) {
            this.result = this.result.toString().slice(0, 12);
        }
        document.getElementById('display').innerHTML = this.result;
    }
}

// 初始化计算器对象
calc.initialize();

// 监听按键事件
var items = document.getElementsByClassName('item');
var item_click = function() {
    var key_type = 'number';
    if (this.classList.contains('operator')) {
        key_type = 'operator';
    } else if (this.classList.contains('clear')) {
        key_type = 'special';
    }

    calc.transition(key_type, this.innerText);
}

for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', item_click, false);
}