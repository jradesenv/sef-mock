module.exports = function (builder) {
    builder.addModule(diService);

    function diService(diData) {
        //definition
        var service = this;
        service.consultar = consultar;
        return service;

        //implementation
        function consultar(pIdentificacao, pIdentificacao_type, pNumDI, callback) {
            if (typeof pIdentificacao == "undefined" || pIdentificacao == "") {
                return callback("Parametro de query pIdentificacao é obrigatorio!");
            }
            if (typeof pIdentificacao_type == "undefined" || pIdentificacao_type == "") {
                return callback("Parametro de query pIdentificacao_type é obrigatorio!");
            }
            if (pIdentificacao_type != "cpf" && pIdentificacao_type != "cnpj") {
                return callback("Parametro de query pIdentificacao_type deve ser 'cpf' ou 'cnpj'.");
            }
            if (typeof pNumDI == "undefined" || pNumDI == "") {
                return callback("Parametro de query pNumDI é obrigatorio!");
            }

            diData.consultar(pIdentificacao, pIdentificacao_type, pNumDI, function (err, resultado) {
                if (err) {
                    return callback(err);
                }

                if (typeof resultado !== "undefined" && resultado !== null) {
                    return callback(null, resultado);
                } else {
                    return callback("Não existem dados para os identificadores informados.");
                }
            });
        }
    }
};
