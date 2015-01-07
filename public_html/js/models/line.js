var app = app || {};

app.Line = Backbone.Model.extend({
    defaults: {
        text: '',
        deleted: false,
        special: 0,
        attrs: 0
    }
});

