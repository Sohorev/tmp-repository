
var app = app || {};

app.LineSpecial = app.LineView.extend({
    className: 'lineContent previewVar',
    
    render: function () {

        this.$el.html(_.template($('#lineTemplate-' + this.model.get("special")).html(), this.model.attributes));
        this.buttonHelper();
//        this.modelBinder.bind(this.model, this.el);        

        return this;
    },
});