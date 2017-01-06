module.exports = function (builder) {
    builder.addModule(diData);

    function diData(constantsHelper, fs, path) {
        //definition
        var service = this;
        service.consultar = consultar;

        loadMockData();

        return service;

        //implementation

        function loadMockData() {
            setTimeout(function() {
                service.arquivoMock = getMockArquivos();
                service.data = getMockData();
            },1000);
        }

        function consultar(pIdentificacao, pIdentificacao_type, pNumDI, callback) {
            var resultado = service.data[getMockKey(pIdentificacao_type, pIdentificacao, pNumDI)];
            callback(null, resultado);
        }

        function getMockKey(pIdentificacao, pIdentificacao_type, pNumDI) {
            return pIdentificacao + "_" + pIdentificacao_type + "_" + pNumDI;
        }

        function getMockArquivos() {
            var arquivos = {};

            arquivos[constantsHelper.arquivoDI.DARE] = fs.readFileSync(path.join(global.__filesPath, "DARE.pdf"), {encoding: 'base64'});
            arquivos[constantsHelper.arquivoDI.GUIA] = fs.readFileSync(path.join(global.__filesPath, "GUIA.pdf"), {encoding: 'base64'});
            
            return arquivos;
        }

        function getMockData() {
            var data = {};

            data[getMockKey('cpf',"83422726640","123")] = getDIMockEntregueDARE('cpf',"83422726640","123");
            data[getMockKey('cpf',"83422726640","11111")] = getDIMockEntregueGUIA('cpf',"83422726640","11111");
            
            return data;
        }

        function getDIMockEntregueDARE(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = getDIMockEntregue(pIdentificacao, pIdentificacao_type, pNumDI, "DI ENTREGUE EXIBINDO DARE", null, constantsHelper.arquivoDI.DARE);
            return di;         
        }

        function getDIMockEntregueGUIA(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = getDIMockEntregue(pIdentificacao, pIdentificacao_type, pNumDI, "DI ENTREGUE EXIBINDO GUIA", null, constantsHelper.arquivoDI.GUIA);
            return di;         
        }

        function getDIMockEntregue(pIdentificacao, pIdentificacao_type, pNumDI, nome, saldoDevedor, arquivoType) {
            var di = {
                situacao: constantsHelper.situacaoDI.entregue,
                identificacao: {
                    type: pIdentificacao_type,
                    value: pIdentificacao
                },
                numero: pNumDI,
                nome: nome
            };

            if(typeof arquivoType !== "undefined" && arquivoType != null) {
                di.arquivo = {
                    type: arquivoType,
                    value: service.arquivoMock[arquivoType]
                };
            }

            if(saldoDevedor) {
                di.mensagem = "DI com saldo devedor";
                di.saldoDevedor = saldoDevedor;
            } else {
                di.mensagem = "DI entregue pelo Recinto Alfandegado Cod.: 453201 - ELOG LOGISTICA SUL LTDA."
                di.comprovante = "16070000008253930";
                di.dataEmissao = "2004-02-12T15:19:21";
            }

            return di;            
        }
    }
};
