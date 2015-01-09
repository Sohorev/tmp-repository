var app = app || {};

app.RawBlockFormDialogView = Backbone.Modal.extend({
    template: _.template($('#rawBlockFormDialogTemplate').html()),
    cancelEl: '.cancelButton',
    parent: null,

    initialize: function (parent) {
        this.parent = parent;
//        console.log(this.parent);
        _.bindAll(this, 'insertRaw');
        this.$el = $("#modalContainer");// без этого унитожается наш html
        this.$el.on('click', '.insertButton', this.insertRaw);
    },
    triggerSubmit: function() {
        // заглушка ентеров для текст ареи
    },
    insertRaw: function() {
//        console.log("qwe");
//        $(this.parent).trigger('insertRawBlock', this.textarea.val());
        this.parent.insertRawBlock(this.$el.find("textarea").val());
        return this.destroy();
    }
});
