function Special() {
    // класс для работы со специальными полями (кроме стандартного ввода)
    // конвертирует json-array представление в DOM поля и обратно
    // также создает preview
    this.arr2field = function(parent, arr) { // используется в Field.draw()
        var sp = arr['special'];
        var div = document.createElement('div');
        div.setAttribute('class', 'lineContent previewVar');
        switch (sp) {
            case 'subst':
                div.appendChild(document.createTextNode('Здесь будет подстановка, например "Номер телефона: $tel$"'));
                break;
            case 'sep':
                div.appendChild(document.createTextNode('Символ-заполнитель: '));
                var inp = document.createElement('input');
                inp.setAttribute('type', 'text');
                inp.setAttribute('value', '-');
                parent.inputs['text'] = inp;
                div.appendChild(inp);
                div.appendChild(document.createTextNode('Количество: '));
                inp = document.createElement('input');
                inp.setAttribute('type', 'text');
                inp.setAttribute('value', '30');
                parent.inputs['count'] = inp;
                div.appendChild(inp);
                break;
            case 'vtab':
                div.appendChild(document.createTextNode(PARA));
                break;
            case 'support':
            case 'site':
                var data = dataKeeper.getPatternByType(sp);
                var text = "";
                for (i in data['lines'])
                    text += data['lines'][i]['text'] + " ";
                div.appendChild(document.createTextNode("[" + sp + "]" + text));
                break;
            case 'logo':
                div.appendChild(showLogo());
                break;
            default:
                div.appendChild(document.createTextNode("Необработанный тип поля " + sp));
        }
        return(div);
    };

    this.field2arr = function(obj) { // используется в Field.get()
        var sp = obj.special;
        var line = {};
        switch (sp) {
            case 'sep':
                if (!obj.inputs['text'].value || !obj.inputs['count'].value)
                    return({});
                line['text'] = obj.inputs['text'].value;
                line['attrs'] = obj.inputs['count'].value;
                break;
            default:
                // vtab, logo, subst, support, site
        };
        return(line);
    };

    this.arr2preview = function(arr) {
        var sp = arr['special'];
        var div = document.createElement('div');
        switch (sp) {
            case 'subst':
                div.setAttribute('class', 'previewVar');
                div.appendChild(document.createTextNode("*** ПОДСТАНОВКА ***"));
                break
            case 'sep':
                var s = "", S = arr['text'];
                for (var i = 0; i < parseInt(arr['attrs']); i++)
                    s += S + SHY;
                div.appendChild(document.createTextNode(s));
                var span = document.createElement('span');
                span.appendChild(document.createTextNode(PARA));
                span.setAttribute('class', 'blankChars');
                div.appendChild(span);
                break;
            case 'vtab':
                div.setAttribute('class', 'blankChars');
                div.appendChild(document.createTextNode(PARA));
                break;
            case 'logo':
                div.appendChild(showLogo());
                break;
            default:
                div.appendChild(document.createTextNode("Необработанный тип поля " + sp));
        }
        return(div);
    };
}
