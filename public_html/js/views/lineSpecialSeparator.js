
var app = app || {};

app.LineSpecialSeparator = app.LineSpecial.extend({
    
    render: function () {

        this.$el.html(_.template($('#lineSeparatorTemplate').html(), this.model.attributes));
        this.buttonHelper();
        this.modelBinder.bind(this.model, this.el);        

        return this;
    },
});