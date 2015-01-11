
var app = app || {};

app.PatternView = Backbone.View.extend({
    el: '#pattern',
    deletedList: [],
    events: {
        "click .restoreLineButton": "restore",
        "click #preview": "previewShow",
        "update-sort": "updateSort"
    },
    initialize: function (initialLines) {
        _.bindAll(this, 'render', 'menuAction', 'appendLine'); // every function that uses 'this' as the current object should be in here
        this.collection = new app.Pattern(initialLines);
        this.collection.bind('add', this.appendLine);
        this.linesContainer = this.$el.find(".linesContainer");
        this.restoreLineButton = this.$el.find(".restoreLineButton");
        this.render();
    },
    render: function () {
//        console.log("pattern.render");
        this.linesContainer.html("");
        this.collection.each(function (item) {
            this.appendLine(item);
        }, this);
        this.restoreLineButton.button({icons: {primary: "ui-icon-stringsowreturnthick-1-w"}}).hide();
        this.linesContainer.sortable({
            axis: 'y',
            containment: 'parent',
            stop: function (e, ui) {
                ui.item.trigger('drop', ui.item.index());
                return true;
            }
        });
    },
    appendLine: function (line, collection, options) {

        if (!line.get("special")) {
            var lineView = new app.LineView({
                model: line,
                parent: this
            });
        } else if (line.get("special") == 'sep') {
            var lineView = new app.LineSpecialSeparator({
                model: line,
                parent: this
            });
        } else {
            var lineView = new app.LineSpecial({
                model: line,
                parent: this
            });
        }
        
        if (options !== undefined) {
            var $lineBefore = this.linesContainer.find(".patternLine:eq(" + options.at + ")");
            $lineBefore.before(lineView.render().el);
        } else {
            this.linesContainer.append(lineView.render().el);
        }
    },
    restore: function () {
        var lineView = this.deletedList.pop();
        if (lineView) {
            lineView.$el.show();
            lineView.model.deleted = false;
        }
        if (!this.deletedList.length)
            this.restoreLineButton.hide();
        return false;
    },
    menuAction: function (act, clickedLineView) {
        if (act == 'cancel') {
            return;
        } else if (act == 'rawblock') {
            this.affectedLineView = clickedLineView;

            this.$el.append("<div id='modalContainer'></div>")
            var rawBlockFormDialogView = new app.RawBlockFormDialogView(this);
            rawBlockFormDialogView.render();
        } else {
            this.counter++;
            var line = new app.Line();
            if (act == 'string')
                act = "";
            if (act == 'sep') {
                line.set({text: "-", attrs: 30});
            }
            line.set({special: act});
            var index = this.collection.indexOf(clickedLineView.model);
            this.collection.add(line, {at: index});
        }
        // 
//        this.render();
    },
    insertRawBlock: function (text) {
        if (!text) {
            return;
        }
        if (!this.affectedLineView) {
            return;
        }
        var PARA = String.fromCharCode(182);
        var MIDDOT = String.fromCharCode(183);
        var SHY = String.fromCharCode(173);
        text = text.replace(new RegExp(SHY, "g"), "").
                replace(new RegExp(MIDDOT, "g"), " ").
                replace(new RegExp(PARA, "g"), "");
        var strings = text.split("\n");
        var index = this.collection.indexOf(this.affectedLineView.model);
        for (var i in strings) {
            var line = new app.Line();
            if (strings[i]) {
                line.set({text: strings[i]});
            } else {
                line.set({text: 'vtab'});
            }
            this.collection.add(line, {at: index++});
        }
    },
    previewShow: function() {
        this.$el.append("<div id='previewContainer'></div>")
        var previewView = new app.PreviewView(this);
        previewView.render();
    },
    updateSort: function(event, model, position) {            
        this.collection.remove(model);

        this.collection.each(function (model, index) {
            var ordinal = index;
            if (index >= position) {
                ordinal += 1;
            }
            model.set('ordinal', ordinal);
        });            
        model.set('ordinal', position);
        this.collection.add(model, {at: position});
        this.render();
    }    
});