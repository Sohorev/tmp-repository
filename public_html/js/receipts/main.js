function RawBlockFormDialog(parent) {
    this.parent = parent;
    this.ddiv = $("<div>").append($("<p>").append("Многострочный блок текста"));
    this.textarea = ($("<textarea>", {width: '100%', rows: 10})).addClass("preview").appendTo(this.ddiv);
    this.ddiv.dialog({modal: true,
        width: 640,
        buttons: [
            {
                text: "Вставить",
                click: $.proxy(function() {
                    $(this.parent).trigger('insertRawBlock', this.textarea.val());
                    this.__del__();
                }, this)
            },
            {
                text: "Отмена",
                click: $.proxy(function() {
                    this.__del__();
                }, this)
            }]
    });
    this.__del__ = function() {
        this.ddiv.dialog("destroy");
        this.ddiv.remove();
    }
};

function FieldManager() {
    this.queue = [];
    this.deletedList = [];
    // обработка возврата из диалога добавления блока
    $(this).bind('insertRawBlock', function(e, text) {
        this.insertRawBlock(text);
    });

    this.draw = function(lines) {
        this.lines = lines;
        var outerDiv = document.createElement('div');
        this.fieldList = document.createElement('div');
        this.restoreLineBtn = document.createElement('button');
        this.restoreLineBtn.appendChild(document.createTextNode('Восстановить удаленную строку'));
        $(this.restoreLineBtn).button({icons: {primary: "ui-icon-arrowreturnthick-1-w"}}).hide().click($.proxy(this.restore, this));
        outerDiv.appendChild(this.restoreLineBtn);
        this.fieldList.appendChild(document.createTextNode(SPACE)); // &nbsp; создает место скраю для перетаскивания
        if (!this.lines.length) { // добиваю до 5
            for (i = this.lines.length; i < 5; i++) {
                this.lines[i] = {};
            }
        }
        for (k in this.lines) {
            field = new Field(this);
            field.draw(this.lines[k]);
            field.div.setAttribute('id', uniqueID.get());
            field.div.setAttribute('class', 'patternLine');
            this.fieldList.appendChild(field.div);
            this.queue[uniqueID.getLast()] = field;
        }
        this.fieldList.appendChild(document.createTextNode(SPACE));
        $(this.fieldList).sortable({axis: 'y', containment: 'parent'});
        outerDiv.appendChild(this.fieldList);
        this.initialState = $.toJSON(this.get());
        return(outerDiv);
    };

    this.restore = function() {
        var f = this.deletedList.pop();
        if (f) {
            $(f.div).show(animSpeed);
            f.deleted = false;
        }
        if (!this.deletedList.length)
            $(this.restoreLineBtn).hide(animSpeed);
        return false;
    };

    this.insertRawBlock = function(text) {
        if (text) {
            text = text.replace(new RegExp(SHY, "g"), "").
                    replace(new RegExp(MIDDOT, "g"), " ").
                    replace(new RegExp(PARA, "g"), "");
            if (this.affectedField) {
                var currentField = this.affectedField;
                var arr = text.split("\n");
                for (var i in arr) {
                    var field = new Field(this);
                    if (arr[i])
                        field.draw({text: arr[i]});
                    else
                        field.draw({special: 'vtab'});
                    field.div.setAttribute('id', uniqueID.get());
                    insertAfter(field.div, currentField.div);
                    this.queue[uniqueID.getLast()] = field;
                    currentField = field;
                }
            }
        }
    };

    this.menuAction = function(act, obj) {
        if (act == 'cancel')
            return;
        else {
            switch (act) {
                case 'rawblock':
                    this.affectedField = obj;
                    new RawBlockFormDialog(this);
                    break;
                default:
                    var field = new Field(this);
                    if (act == 'string')
                        act = "";
                    field.draw({special: act});
                    field.div.setAttribute('id', uniqueID.get());
                    insertAfter(field.div, obj.div);
                    this.queue[uniqueID.getLast()] = field;
                    break;
            }
        }
    };

    this.get = function() {
        // половина кода тут для правильной сортировки
        var lines = [];
        var idOrder = $(this.fieldList).sortable("toArray");
        for (i in idOrder) {
            var line = this.queue[idOrder[i]].get();
            if (!line) {
                continue;
            }
            ;
            line['pos'] = i;
            lines.push(line);
        }
        return(lines);
    };

    this.isChanged = function() {
        var currState = $.toJSON(this.get());
        if (currState != this.initialState)
            return(true);
        else
            return(false);
    };

    this.dropIDs = function() {
        for (i in this.queue) {
            this.queue[i]['id'] = null;
        }
    };
}

window.onerror = function(em, url, ln) {
    alert(Text.jsError + em + ", " + url + ", " + ln);
    return false;
};
