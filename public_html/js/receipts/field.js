function Field(parent) {
    // Класс хранит ссылки на div и все поля ввода
    this.inputs = {};
    this.parent = parent;
    this.deleted = false;
    this.erase = function() {
        this.deleted = true;
        $(this.div).hide(animSpeed);
        parent.deletedList.push(this);
        $(parent.restoreLineBtn).show(animSpeed);
        return false;
    };

    this.menuAction = function(e) {
        var act = String(e.target).split("#", 2)[1];
        $("#addMenu").hide();
        this.parent.menuAction(act, this);
    };

    this.menu = function(e) {
        $("#addMenu").show();
        if (e.pageY - $("#addMenu").height() <= 0)
            var y = e.pageY - 8;
        else
            var y = e.pageY - $("#addMenu").height() + 8;

        $("#addMenu").offset({left: e.pageX - $("#addMenu").width() + 2, top: y});
        $("#addMenu a").unbind('click');
        $("#addMenu a").click($.proxy(this.menuAction, this));
        return false;
    };

    this.get = function() {
        line = {};
        line['deleted'] = this.deleted;
        line['special'] = this.special;
        line['id'] = this.id;
        line['text'] = "";
        line['attrs'] = 0;
        if (this.special) {
            $.extend(line, specialHndl.field2arr(this));
        } else {
            f = this.inputs;
            if (!f['text'].value && !this.deleted && !this.id) {
                return;
            }
            line['text'] = f['text'].value;
            if (f['b'].checked) {
                line['attrs'] |= Math.pow(2, 5);
            }
            if (f['u'].checked) {
                line['attrs'] |= Math.pow(2, 4);
            }
            if (f['l'].checked) {
                line['attrs'] |= 0;
            }
            else if (f['c'].checked) {
                line['attrs'] |= 1;
            }
            else if (f['r'].checked) {
                line['attrs'] |= 2;
            }
        }
        return(line);
    };

    this.draw = function(line) {
        // line -- словарь строки данных
        this.special = line['special'];
        this.id = line['id'];
        this.div = document.createElement('div');
        btn = document.createElement('span');
        btn.appendChild(document.createTextNode('Нажмите и ведите для перетаскивания'));
        $(btn).button({icons: {primary: "ui-icon-carat-2-n-s"}, text: false});
        this.div.appendChild(btn);
        if (!line['special']) {
            this.special = "";
            this.drawDataLine(line);
        } else {
            // я вынес всю работу по спецполям в класс Special
            this.div.appendChild(specialHndl.arr2field(this, line));
        }
        div = document.createElement('div');
        btn = document.createElement('button');
        btn.appendChild(document.createTextNode('Добавить'));
        $(btn).button({icons: {primary: "ui-icon-gear", secondary: "ui-icon-triangle-1-s"}, text: false});
        $(btn).click($.proxy(this.menu, this));
        div.appendChild(btn);
        btn = document.createElement('button');
        btn.appendChild(document.createTextNode('Удалить'));
        $(btn).button({icons: {primary: "ui-icon-circle-close"}, text: false});
        $(btn).click($.proxy(this.erase, this));
        div.appendChild(btn);
        $(div).buttonset();
        this.div.appendChild(div);
    };

    this.drawDataLine = function(l) {
        attrBits = int2bitArray(l['attrs']);
        //__bu __bu __bu __<>
        if (!l['text']) {
            l['text'] = ''
        }
        // text
        inp = document.createElement('input');
        this.inputs['text'] = inp;
        inp.setAttribute('type', 'text');
        inp.setAttribute('value', l['text']);
        //inp.setAttribute('name', 'text[' + uniqueID.get() + ']');
        inp.setAttribute('class', 'lineContent preview');
        this.div.appendChild(inp);
        div = document.createElement('div');

        // checkbox1
        inp = document.createElement('input');
        this.inputs['b'] = inp;
        inp.setAttribute('id', uniqueID.get());
        inp.setAttribute('type', 'checkbox');
        if (attrBits[5] == 1) {
            inp.setAttribute('checked', 'true');
        }
        div.appendChild(inp);
        lab = document.createElement('label');
        lab.setAttribute('for', uniqueID.getLast());
        lab.setAttribute('style', 'font-weight: bold');;
        lab.appendChild(document.createTextNode("B"));
        div.appendChild(lab);
        // checkbox2
        inp = document.createElement('input');
        this.inputs['u'] = inp;
        inp.setAttribute('id', uniqueID.get());
        inp.setAttribute('type', 'checkbox');
        if (attrBits[4] == 1) {
            inp.setAttribute('checked', 'true');
        }
        div.appendChild(inp);
        lab = document.createElement('label');
        lab.setAttribute('for', uniqueID.getLast());
        lab.setAttribute('style', 'text-decoration: underline !important');
        lab.appendChild(document.createTextNode("U"));
        div.appendChild(lab);
        this.div.appendChild(div);
        $(div).buttonset();

        div = document.createElement('div');
        inp = document.createElement('input');
        var groupName = uniqueID.get();
        inp.setAttribute('id', uniqueID.get());
        inp.setAttribute('type', 'radio');
        if (attrBits[1] == 0 && attrBits[0] == 0) {
            inp.setAttribute('checked', 'true');
        }
        inp.setAttribute('name', groupName);
        this.inputs['l'] = inp;
        div.appendChild(inp);
        lab = document.createElement('label');
        lab.setAttribute('for', uniqueID.getLast());
        img = document.createElement('img');
        img.setAttribute('src', '/img/common/receipts/format-justify-left.png');
        lab.appendChild(img);
        div.appendChild(lab);
        inp = document.createElement('input');
        inp.setAttribute('id', uniqueID.get());
        inp.setAttribute('type', 'radio');
        if (attrBits[1] == 0 && attrBits[0] == 1) {
            inp.setAttribute('checked', 'true');
        }
        inp.setAttribute('name', groupName);
        this.inputs['c'] = inp;
        div.appendChild(inp);
        lab = document.createElement('label');
        lab.setAttribute('for', uniqueID.getLast());
        img = document.createElement('img');
        img.setAttribute('src', '/img/common/receipts/format-justify-center.png');
        lab.appendChild(img);
        div.appendChild(lab);
        inp = document.createElement('input');
        inp.setAttribute('id', uniqueID.get());
        inp.setAttribute('type', 'radio');
        if (attrBits[1] == 1 && attrBits[0] == 0) {
            inp.setAttribute('checked', 'true');
        }
        inp.setAttribute('name', groupName);
        this.inputs['r'] = inp;
        div.appendChild(inp);
        lab = document.createElement('label');
        lab.setAttribute('for', uniqueID.getLast());
        img = document.createElement('img');
        img.setAttribute('src', '/img/common/receipts/format-justify-right.png');
        lab.appendChild(img);
        div.appendChild(lab);
        $(div).buttonset();
        this.div.appendChild(div);
    };
}
