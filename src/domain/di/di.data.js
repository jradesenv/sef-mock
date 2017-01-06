module.exports = function (builder) {
    builder.addModule(diData);

    function diData() {
        //definition
        var service = this;
        service.data = getMockData();
        service.consultar = consultar;
        return service;

        //implementation
        function consultar(pIdentificacao, pIdentificacao_type, pNumDI, callback) {
            var resultado = service.data[getMockKey(pIdentificacao_type, pIdentificacao, pNumDI)];
            callback(null, resultado);
        }

        function getMockKey(pIdentificacao, pIdentificacao_type, pNumDI) {
            return pIdentificacao + "_" + pIdentificacao_type + "_" + pNumDI;
        }

        function getMockData() {
            var data = {};
            data[getMockKey('cpf',"83422726640","123")] = getDIMock('cpf',"83422726640","123");
            data[getMockKey('cnpj',"60664065000163","123")] = getDIMock('cnpj',"60664065000163","123");
            return data;
        }

        function getDIMock(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = {
                nome: pIdentificacao + pIdentificacao_type
            };
            return di;            
        }
    }
};
