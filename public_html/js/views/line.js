
var app = app || {};

app.LineView = Backbone.View.extend({
    tagName: 'div',
    className: 'patternLine',
    events: {
        "click .menuButton": "menu",
        "click .deleteButton": "delete",
        "drop": "drop",
        "click input[type=radio]": "onRadioClick",
    },
    initialize: function (options) {
        this.parent = options.parent;
        this.model.on('destroy', this.remove, this);
        this.modelBinder = new Backbone.ModelBinder();
    },
    render: function () {
        
        var alignmentName = _.uniqueId(['alignment_']);
        
        var bindings = {
            text: '[name=text]',
            bold: {selector: '[name=b]', converter: this.model.getBold},
            underline: {selector: '[name=u]', converter: this.model.getUnderline},
        };
        
        var bindingsSimpleTemplate = _.extend({
            alignmentName: alignmentName,
        }, bindings);
        
        this.$el.html(_.template($('#lineTemplate').html(), bindingsSimpleTemplate));
        this.$el.find(".alignment").buttonset();
        this.buttonHelper();
        this.modelBinder.bind(this.model, this.el, bindings);
        
        if (this.model.getLeftAlignment('ModelToView')) {
            this.$el.find("[value=l]").prop("checked", true);
        }
        if (this.model.getCenterAlignment('ModelToView')) {
            this.$el.find("[value=c]").prop("checked", true);
        }
        if (this.model.getRightAlignment('ModelToView')) {
            this.$el.find("[value=r]").prop("checked", true);
        }
        
        return this;
    },
    onRadioClick: function (e) {
        e.stopPropagation();
        var numberOfBit;
        var val = $(e.currentTarget).val();
        var attrs = this.model.get('attrs');
        // сбросили все биты в ноль
        attrs &= ~Math.pow(2, 0);
        attrs &= ~Math.pow(2, 1);
        attrs &= ~Math.pow(2, 2);
        console.log(attrs);
        if (val == 'l') {
            numberOfBit = 0;
        } else if (val == 'c') {
            numberOfBit = 1;
        } else if (val == 'r') {
            numberOfBit = 2;
        }
        // выставили нужный бит
        this.model.set('attrs', attrs|Math.pow(2, numberOfBit));
    },    
    buttonHelper: function () {
        this.$el.find(".dragabble").button({icons: {primary: "ui-icon-carat-2-n-s"}, text: false});
        this.$el.find(".menuButton").button({icons: {primary: "ui-icon-gear", secondary: "ui-icon-triangle-1-s"}, text: false});
        this.$el.find(".deleteButton").button({icons: {primary: "ui-icon-circle-close"}, text: false});
        this.$el.find(".actionList").buttonset();
    },
    menu: function (e) {
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
    menuAction: function (e) {
        var act = String(e.target).split("#", 2)[1];
        $("#addMenu").hide();
        this.parent.menuAction(act, this);
    },
    delete: function () {
        this.model.deleted = true;
        this.$el.hide();
        this.parent.deletedList.push(this);
        this.parent.restoreLineButton.show();

        return false;
    },
    drop: function (event, index) {
        // sortable trigger
        this.$el.trigger('update-sort', [this.model, index]);
    },
});