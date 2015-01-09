
var app = app || {};

app.LineSpecial = app.LineView.extend({
    render: function () {

        this.$el.html(_.template($('#lineTemplate').html(), this.model.attributes));
        this.$el.find(".dragabble").button({icons: {primary: "ui-icon-carat-2-n-s"}, text: false});
        this.$el.find(".menuButton").button({icons: {primary: "ui-icon-gear", secondary: "ui-icon-triangle-1-s"}, text: false});
        this.$el.find(".deleteButton").button({icons: {primary: "ui-icon-circle-close"}, text: false});
        this.$el.find(".actionList").buttonset();
        this.modelBinder.bind(this.model, this.el);        

        return this;
    },
});