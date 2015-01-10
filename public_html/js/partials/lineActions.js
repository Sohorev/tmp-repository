var app = app || {};

app.lineActions = function() {
    var tmpl = $('#lineActionsPartial').html();
    return _.template(tmpl)();
};
