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
            setTimeout(function () {
                service.arquivoMock = getMockArquivos();
                service.data = getMockData();
            }, 1000);
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

            arquivos[constantsHelper.tipoDocumentoDI.DARE] = fs.readFileSync(path.join(global.__filesPath, "DARE.pdf"), { encoding: 'base64' });
            arquivos[constantsHelper.tipoDocumentoDI.GUIA] = fs.readFileSync(path.join(global.__filesPath, "GUIA.pdf"), { encoding: 'base64' });

            return arquivos;
        }

        function getMockData() {
            var data = {};

            //entregue
            data[getMockKey('cpf', "83422726640", "12345")] = getDIMockEntregue('cpf', "83422726640", "12345", "ESTA E UMA DI ENTREGUE");
            data[getMockKey('cpf', "83422726640", "11111")] = getDIMockEntregueGUIA('cpf', "83422726640", "11111");
            data[getMockKey('cpf', "83422726640", "22222")] = getDIMockEntregueDARE('cpf', "83422726640", "22222");
            data[getMockKey('cnpj', "67695137000189", "12345")] = getDIMockEntregueComSaldoDevedor('cnpj', "67695137000189", "12345");

            //liberada
            data[getMockKey('cnpj', "67695137000189", "11111")] = getDIMockLiberadaComMensagem('cnpj', "67695137000189", "11111");
            data[getMockKey('cnpj', "67695137000189", "22222")] = getDIMockLiberadaGUIA('cnpj', '67695137000189', '22222');

            //nao liberada
            data[getMockKey('cnpj', "67695137000189", "33333")] = getDIMockNaoLiberadaBloqueada('cnpj', '67695137000189', '33333');
            data[getMockKey('cnpj', "67695137000189", "44444")] = getDIMockNaoLiberadaComMensagem('cnpj', '67695137000189', '44444');
            data[getMockKey('cnpj', "67695137000189", "55555")] = getDIMockNaoLiberadaComMensagemEDare('cnpj', '67695137000189', '55555');
            data[getMockKey('cnpj', "67695137000189", "66666")] = getDIMockNaoLiberadaComSaldoDevedorEDARE('cnpj', '67695137000189', '66666');
            data[getMockKey('cnpj', "67695137000189", "77777")] = getDIMockNaoLiberadaValorFaltante('cnpj', '67695137000189', '77777');            

            return data;
        }

        function getDIMockEntregueDARE(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = getDIMockEntregue(pIdentificacao, pIdentificacao_type, pNumDI, "ESTA E UMA DI ENTREGUE EXIBINDO DARE", null, constantsHelper.tipoDocumentoDI.DARE);
            return di;
        }

        function getDIMockEntregueGUIA(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = getDIMockEntregue(pIdentificacao, pIdentificacao_type, pNumDI, "ESTA E UMA DI ENTREGUE EXIBINDO GUIA", null, constantsHelper.tipoDocumentoDI.GUIA);
            return di;
        }

        function getDIMockEntregueComSaldoDevedor(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = getDIMockEntregue(pIdentificacao, pIdentificacao_type, pNumDI, "ESTA E UMA DI ENTREGUE COM SALDO DEVEDOR", 235.06);
            return di;
        }

        function getDIMockEntregue(pIdentificacao, pIdentificacao_type, pNumDI, nome, saldoDevedor, arquivoType) {
            var di = getDIMockBase(pIdentificacao, pIdentificacao_type, pNumDI, nome, constantsHelper.situacaoDI.entregue);

            if (typeof arquivoType !== "undefined" && arquivoType != null) {
                di.documento = service.arquivoMock[arquivoType];
                di.tipoDocumento = arquivoType;
            }

            if (saldoDevedor) {
                di.mensagem = "DI com saldo devedor";
                di.saldoDevedor = saldoDevedor;
            } else {
                di.mensagem = "DI entregue pelo Recinto Alfandegado Cod.: 453201 - ELOG LOGISTICA SUL LTDA."
                di.comprovante = "16070000008253930";
                di.dataEmissao = "2004-02-12T15:19:21";
            }

            return di;
        }

        function getDIMockLiberadaComMensagem(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = getDIMockLiberada(pIdentificacao, pIdentificacao_type, pNumDI, "ESTA E UMA DI LIBERADA COM MENSAGEM");
            di.mensagem = "Dirija-se ao Recinto Alfandegado para a emissão do Protocolo de Liberação e retirada da mercadoria.";

            return di;
        }

        function getDIMockLiberadaGUIA(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = getDIMockLiberada(pIdentificacao, pIdentificacao_type, pNumDI, "ESTA E UMA DI LIBERADA COM GUIA", null, constantsHelper.tipoDocumentoDI.GUIA);

            return di;
        }

        function getDIMockLiberada(pIdentificacao, pIdentificacao_type, pNumDI, nome, saldoDevedor, arquivoType) {
            var di = getDIMockBase(pIdentificacao, pIdentificacao_type, pNumDI, nome, constantsHelper.situacaoDI.liberada);

            if (typeof arquivoType !== "undefined" && arquivoType != null) {
                di.documento = service.arquivoMock[arquivoType];
                di.tipoDocumento = arquivoType;
            }

            if (saldoDevedor) {
                di.mensagem = "DI com saldo devedor";
                di.saldoDevedor = saldoDevedor;
            }

            return di;
        }

        function getDIMockNaoLiberadaValorFaltante(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = getDIMockNaoLiberada(pIdentificacao, pIdentificacao_type, pNumDI, "ESTA E UMA DI NAO LIBERADA COM VALOR FALTANTE");
            di.mensagem = "Pagamento antecipado inexistente ou insuficiente";
            di.somaValoresDI = 10511.26;
            di.valorBaseCalculo = 11944.61;
            di.valorPagamentoAntecipadoEsperado = 537.51;
            di.valorPagamentoAntecipadoEfetuado = 0;
            di.valorPagamentoAntecipadoAEfetuar = 537.51;

            return di;
        }

        function getDIMockNaoLiberadaBloqueada(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = getDIMockNaoLiberada(pIdentificacao, pIdentificacao_type, pNumDI, "ESTA E UMA DI NAO LIBERADA BLOQUEADA");
            di.mensagem = "DI bloqueada: Declaração do ICMS efetuada no SISCOMEX indica valor de imposto a pagar inferior ao esperado"
            di.valorDeclarado = 1482.77;
            di.valorEsperado = 1601.45;

            return di;
        }

        function getDIMockNaoLiberadaComMensagemEDare(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = getDIMockNaoLiberada(pIdentificacao, pIdentificacao_type, pNumDI, "ESTA E UMA DI NAO LIBERADA COM DARE E MENSAGEM", null, constantsHelper.tipoDocumentoDI.DARE);
            di.mensagem = "DI não recebida do SISCOMEX/SRF";
            return di;
        }

        function getDIMockNaoLiberadaComMensagem(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = getDIMockNaoLiberada(pIdentificacao, pIdentificacao_type, pNumDI, "ESTA E UMA DI NAO LIBERADA COM MENSAGEM");
            di.mensagem = "DI não recebida do SISCOMEX/SRF";
            return di;
        }

        function getDIMockNaoLiberadaComSaldoDevedorEDARE(pIdentificacao, pIdentificacao_type, pNumDI) {
            var di = getDIMockNaoLiberada(pIdentificacao, pIdentificacao_type, pNumDI, "ESTA E UMA DI NAO LIBERADA COM DARE E SALDO DEVEDOR", 7294.45, constantsHelper.tipoDocumentoDI.DARE);

            return di;
        }

        function getDIMockNaoLiberada(pIdentificacao, pIdentificacao_type, pNumDI, nome, saldoDevedor, arquivoType) {
            var di = getDIMockBase(pIdentificacao, pIdentificacao_type, pNumDI, nome, constantsHelper.situacaoDI.naoLiberada);

            if (typeof arquivoType !== "undefined" && arquivoType != null) {
                di.documento = service.arquivoMock[arquivoType];
                di.tipoDocumento = arquivoType;
            }

            if (saldoDevedor) {
                di.mensagem = "DI com saldo devedor";
                di.saldoDevedor = saldoDevedor;
            }

            return di;
        }

        function getDIMockBase(pIdentificacao, pIdentificacao_type, pNumDI, nome, situacao) {
            var di = {
                situacao: situacao,
                identificacao: {
                    type: pIdentificacao_type,
                    value: pIdentificacao
                },
                numero: pNumDI,
                nome: nome
            };

            return di;
        }
    }
};
