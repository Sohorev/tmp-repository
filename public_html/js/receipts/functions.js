animSpeed = 200;
SPACE = String.fromCharCode(160);
PARA = String.fromCharCode(182);
MIDDOT = String.fromCharCode(183);
SHY = String.fromCharCode(173);
adminEmail = "eliseev@quickpay.ru";
uniqueID = new UniqueID();

function int2bitArray(inp) {
    var out = [];
    for (i = 0; i < 32; i++) {
        out[i] = (inp >>> i) & 1;
    }
    return(out);
}

function UniqueID() {
    this.uniq = '00000';
    this.get = function get() {
        // возвращает уникальный ID
        var min = 10000, max = 99999;
        var uniq = 'uniq' + (Math.floor(Math.random() * (max - min + 1)) + min);
        if (document.getElementById(uniq) || document.getElementsByName(uniq).length) {
            return this.get();
        } else {
            this.uniq = uniq;
            return(uniq);
        }
    };
    this.getLast = function() {
        // возвращает последний созданный ID
        return(this.uniq);
    };
}

function insertAfter(elem, refElem) {
    var parent = refElem.parentNode;
    var next = refElem.nextSibling;
    if (next) {
        return parent.insertBefore(elem, next);
    } else {
        return parent.appendChild(elem);
    }
}

tableLocaleRU = {
    "sProcessing": "Подождите...",
    "sLengthMenu": "Показать _MENU_ записей",
    "sZeroRecords": "Записи отсутствуют.",
    "sInfo": "Записи с _START_ до _END_ из _TOTAL_ записей",
    "sInfoEmpty": "Записи с 0 до 0 из 0 записей",
    "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
    "sInfoPostFix": "",
    "sSearch": "Поиск:",
    "sUrl": "",
    "oPaginate": {
        "sFirst": "Первая",
        "sPrevious": "Предыдущая",
        "sNext": "Следующая",
        "sLast": "Последняя"
    }
};

function showLogo()
{
    var img = document.createElement('img');
    img.setAttribute('src', '/img/logo-for-pdf-cheque.png');
    return(img);
}

function htmlentities(s) {   // Convert all applicable characters to HTML entities
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    var div = document.createElement('div');
    var text = document.createTextNode(s);
    div.appendChild(text);
    return div.innerHTML;
}


function htmlentities(s) {   // Convert all applicable characters to HTML entities
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    var div = document.createElement('div');
    var text = document.createTextNode(s);
    div.appendChild(text);
    return div.innerHTML;
}

function setCookie(c_name, value, exdays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++)
    {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name)
            return unescape(y);
    }
}

function jsonParser(ans) {
    try {
        json = $.evalJSON(ans)
    }
    catch (e) {
        if (e.name.toString() == "SyntaxError") {
            alert(e.message)
            return
        } else {
            return
        }
    }
    if (json['warning'])
        noty({text: "Ошибка на сервере: " + json['warning'], dismissQueue: true, type: 'warning'})
    if (json['error']) {
        noty({text: "Ошибка на сервере: " + json['error'], dismissQueue: true, type: 'error'})
        return
    }
    return(json)
}

function extendClass(Child, Parent) {
    var F = function() {
    }
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
    Child.superclass = Parent.prototype
}

Text = {
    cantRemove: '<b>Нельзя так просто взять <br><img src="img/boromir.jpg"><br> и удалить шаблон со ссылками.<br>Удалите сначала все ссылки на сервисы или подстановочные шаблоны<b>',
    removeConfirm: '<b><img src="img/rip.png"><br>Удаление шаблона невозможно отменить. Точно удалить?</b>',
    jsError: 'На странице произошла ошибка. Возможно, перезагрузка страницы поможет исправить её. ' +
            'Так же рекомендуется скопировать нижеследующее описание ошибки и отправить на e-mail ' + adminEmail + '\n\n\n',
    notChrome: "<img src='img/google-chrome.png' style='float:left'>\
 <br><b>Знаете ли вы, что...</b><br><br><br>в последних версиях\
 <a href='https://www.google.com/intl/ru/chrome/browser' target=_blank>Google Chrome</a> эта страница работает намного быстрее?<br>",
    dropForm: "<img src='img/rubber_eraser_erase_empty.png'><br>Шаблон изменен. Все равно продолжить?"
}
