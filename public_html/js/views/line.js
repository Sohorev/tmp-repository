
var app = app || {};

app.LineView = Backbone.View.extend({
    tagName: 'div',
    className: 'patternLine',
    events: {
        "click .menuButton": "menu",
        "click .deleteButton": "delete"
    },
    
    initialize: function (options) {
        this.parent = options.parent;
        this.listenTo(this.model, "change", this.render);
    },
    render: function () {

        this.$el.html(_.template($('#lineTemplate').html(), this.model.attributes));
        this.$el.find(".dragabble").button({icons: {primary: "ui-icon-carat-2-n-s"}, text: false});
        this.$el.find(".menuButton").button({icons: {primary: "ui-icon-gear", secondary: "ui-icon-triangle-1-s"}, text: false});
        this.$el.find(".deleteButton").button({icons: {primary: "ui-icon-circle-close"}, text: false});
        this.$el.find(".actionList").buttonset();

        return this;
    },
    menu: function(e) {
        $("#addMenu").show();
        if (e.pageY - $("#addMenu").height() <= 0)
            var y = e.pageY - 8;
        else
            var y = e.pageY - $("#addMenu").height() + 8;

        $("#addMenu").offset({left: e.pageX - $("#addMenu").width() + 2, top: y});
        $("#addMenu a").unbind('click');
        $("#addMenu a").click($.proxy(this.menuAction, this));
        return false;
    },
    menuAction: function(e) {
        var act = String(e.target).split("#", 2)[1];
        $("#addMenu").hide();
        this.parent.menuAction(act, this);
    },
    delete: function() {
        this.model.deleted = true;
        this.$el.hide();
        this.parent.deletedList.push(this);
        this.parent.restoreLineButton.show();
        
        return false;
    },
});