var app = app || {};

app.Pattern = Backbone.Collection.extend({
    model: app.Line,
    comparator: function(model) {
        return model.get('ordinal');
    },    
});