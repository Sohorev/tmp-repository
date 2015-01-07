
var app = app || {};

app.PatternView = Backbone.View.extend({
    el: '#pattern',
    deletedList: [],
    events: {
        "click .restoreLineButton": "restore"
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
        this.linesContainer.html("");
        this.collection.each(function (item) {
            this.appendLine(item);
        }, this);
        this.restoreLineButton.button({icons: {primary: "ui-icon-arrowreturnthick-1-w"}}).hide();
        this.linesContainer.sortable({axis: 'y', containment: 'parent'});
    },
    appendLine: function (line, collection, options) {
        var lineView = new app.LineView({
            model: line,
            parent: this
        });
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
            this.affectedField = clickedLineView;
            new RawBlockFormDialog(this);
        } else {
            this.counter++;
            var line = new app.Line();
            if (act == 'string')
                act = "";
            line.set({special: act});
            var index = this.collection.indexOf(clickedLineView.model);
            this.collection.add(line, {at: index});
        }
        // 
//        this.render();
    },
});