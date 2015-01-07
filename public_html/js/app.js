var app = app || {};

$(function () {
    
    var lines = [
        {text: '1', special: 0},
        {text: '2', special: 0},
        {text: '3', special: 0},
    ];

    new app.PatternView(lines);
});