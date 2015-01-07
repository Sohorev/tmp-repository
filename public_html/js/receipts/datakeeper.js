function DataKeeper() {
    this.data = {};

    this.getPattern = function(id) {
        if (!id)
            return;

        var ret;
        $.ajax({
            url: '/idx.php/receipt/pattern-get/index/id/' + id,
            data: {},
            async: false,
            success: function (result) {
                ret = result;
            }
        });

        return ret;
    };

    this.getNullPattern = function() {
        return({id: null, lines: [], links: 0, name: '', parent: null, sids: []});
    };

    this.getPatternByType = function(type) {
        if (type) {
            var ret;
            $.ajax({
                url: '/idx.php/receipt/pattern-get/by-type/type/' + type,
                data: {},
                async: false,
                success: function (result) {
                    ret = result;
                }
            });
            return ret;
        }
        return this.getNullPattern();
    };

    this.tr = function(text, lang) {
        return text;
    };
}
