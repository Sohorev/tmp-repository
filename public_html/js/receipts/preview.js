
function Preview() {
    this.dialog = $($("<div>", {'class': "preview"})).dialog({
        modal: true,
        width: 330,
        autoOpen: false,
        buttons: [{
            text: "Ok",
            click: function() {
                $(this).dialog("close");
            }
        }]
    });
    var bs = $("<div>");

    bs.buttonset().appendTo(this.dialog.dialog('widget').find("div.ui-dialog-buttonpane"));
    $("#pvLang_common").click();
    $("input[name=pvLang]").click($.proxy(function(e) {
        this.show();
    }, this));
    this.content = $("<div>").appendTo(this.dialog);

    this.renderInputLine = function(line, lang) {
        var attrBits = int2bitArray(line['attrs']);
        var div = document.createElement('div');
        var span = document.createElement('span');
        if (attrBits[5] == 1)
            $(span).css("font-weight", "bold");
        if (attrBits[4] == 1)
            $(span).css("text-decoration", "underline");
        var text = htmlentities(dataKeeper.tr(line['text'], lang));
        //"<span class=blankChars>"+MIDDOT+SHY+"</span>"
        text = text.replace(/ /g, "<span class=blankChars>" + SHY + MIDDOT + "</span>") + "<span class=blankChars>" + PARA + "</span>";
        text = text.replace(/(\$[A-Za-z0-9\-_]+\$)/g, "<span class=previewVar>$1</span>");
        span.innerHTML = text;
        if (attrBits[0] == 1 && attrBits[1] == 0)
            $(div).css("text-align", "center");
        else if (attrBits[0] == 0 && attrBits[1] == 1)
            $(div).css("text-align", "right");
        div.appendChild(span);
        return(div);
    };

    this.show = function(list, pid) {
        this.content.empty();
        //var lang = $("input[name=pvLang]:checked").attr('id').split('_')[1];
        //if (!lang)
            lang = 'common';
        if (list) {
            if (pid) { // раскрытие подстановки
                parent = dataKeeper.getPattern(pid);
                if (parent['lines']) {
                    var newlist = [];
                    for (var i in parent.lines) {
                        if (parent.lines[i].special == 'subst')
                            newlist = newlist.concat(list);
                        else
                            newlist.push(parent.lines[i]);
                    }
                    list = newlist;
                }
            }
            var newlist = [];
            for (var i in list) { // раскрываю вставки
                line = list[i];
                if (line['special'] == "support" || line['special'] == "site") {
                    var globalsSubst = dataKeeper.getPatternByType(line['special']);
                    newlist = newlist.concat(globalsSubst['lines']);
                } else
                    newlist.push(line);
            }
            this.processedList = newlist;
        }
        if (this.processedList) {
            for (var i in this.processedList) {
                line = this.processedList[i]
                if (line.deleted)
                    continue;
                if (!line['special']) {
                    this.content.append(this.renderInputLine(line, lang));
                }
                else
                    this.content.append(specialHndl.arr2preview(line));
            }
        }
        this.dialog.dialog('open');
    };
}
