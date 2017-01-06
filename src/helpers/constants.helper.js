module.exports = function(builder) {
    builder.addModule(constantsHelper);

    function constantsHelper() {
        //definition
        var helper = this;
        helper.port = process.env.PORT || 3005;

        helper.situacaoDI = {
            "entregue": 0,
            "liberada": 1,
            "naoLiberada": 2
        };

        helper.tipoDocumentoDI = {
            "DARE": 0,
            "GUIA": 1
        };

        return helper;
    }
};
