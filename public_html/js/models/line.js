var app = app || {};

app.Line = Backbone.Model.extend({
    defaults: {
        text: '',
        deleted: false,
        special: 0,
        attrs: 0
    },
    initialize: function (initialLines) {
        _.bindAll(this, 'getBold', 'getUnderline', 'getLeftAlignment', 'getRightAlignment', 'getCenterAlignment');
    },
    int2bitArray: function (inp) {
        var out = [];
        for (i = 0; i < 32; i++) {
            out[i] = (inp >>> i) & 1;
        }
        return(out);
    },
    checkedToBit: function(direction, value, numberOfBit) {
//            console.log(direction +  ' ' + value);
        if (direction === 'ModelToView') {
            var attrBits = this.int2bitArray(this.get('attrs'));
            if (attrBits[numberOfBit] == 1) {
                
                return true;
            }
            return false;
        } else {
            this.set('attrs', this.get('attrs')^Math.pow(2, numberOfBit));
        }
        return value === true;
    },
    getBold: function (direction, value) {
        return this.checkedToBit(direction, value, 5);
    },
    getUnderline: function (direction, value) {
        return this.checkedToBit(direction, value, 4);
    },
    getLeftAlignment: function (direction, value) {
        return this.checkedToBit(direction, value, 0);
        return true;
    },
    getCenterAlignment: function (direction, value) {
        return this.checkedToBit(direction, value, 1);
    },
    getRightAlignment: function (direction, value) {
        return this.checkedToBit(direction, value, 2);
    }
});

