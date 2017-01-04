module.exports = function(builder) {
    builder.addModule(constantsHelper);

    function constantsHelper() {
        //definition
        var helper = this;
        helper.port = process.env.PORT || 3005;

        return helper;
    }
};
