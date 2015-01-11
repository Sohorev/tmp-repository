var app = app || {};

app.PreviewView = Backbone.Modal.extend({
    template: _.template($('#previewTemplate').html()),
    cancelEl: '.cancelButton',
    parent: null,

    initialize: function (parent) {
        this.parent = parent;
        this.$el = $("#previewContainer");// без этого унитожается наш html
    },
    onRender: function() {
        this.linesContainer = $("#previewLinesContainer");
        this.parent.collection.each(function (item) {
            this.appendLine(item);
        }, this);
    },
    appendLine: function(line) {
//        this.linesContainer.append(lineView.render().el);
        this.linesContainer.append("<div>assdas</div>");
    }
//    triggerSubmit: function() {},
});
