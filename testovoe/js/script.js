document.addEventListener('DOMContentLoaded', function(){
    console.log('test');
   
    var form = document.querySelector('.calc');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });
    var res_field = document.querySelector('.calc__result-field');
    var btn_num = document.querySelectorAll('.js--btn-add-res');
    var btn_reset = document.querySelector('.js--btn-reset');
    var btn_calc = document.querySelector('.js--btn-add-calc');
    // Функция проверки корректности выражения перед расчетом
    function isValidExpression(expr) {
        expr = expr.replace(/\s+/g, '');
        if (!/^[0-9+\-*/().]+$/.test(expr)) return false;
        if (/[\+\-\*\/]{2,}/.test(expr)) return false;
        if (/^[\+\-\*\/]/.test(expr) || /[\+\-\*\/]$/.test(expr)) return false;
        return true;
    }
    // Очистка поля от недопустимых символов в режиме ввода
    res_field.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9+\-*/().]/g, '');
    });
    for (var i = 0; i < btn_num.length; i++) {
        btn_num[i].addEventListener('click', function(e){
            e.preventDefault();
            res_field.value += this.innerHTML;
        });
    }
    btn_reset.addEventListener('click', function(e){
        e.preventDefault();
        res_field.value = '';
    });
    btn_calc.addEventListener('click', function(e){
        e.preventDefault();
        const expr = res_field.value;
        if (isValidExpression(expr)) {
            try {
                res_field.value = eval(expr);
            } catch {
                res_field.value = 'Ошибка';
            }
        } else {
            res_field.value = 'Некорректное выражение';
        }
    });
});