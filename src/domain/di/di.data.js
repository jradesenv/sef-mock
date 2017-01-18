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

        function consultar(pIdentificacao_type, pIdentificacao, pNumDI, callback) {
            var resultado = service.data[getMockKey(pIdentificacao_type, pIdentificacao, pNumDI)];
            callback(null, resultado);
        }

        function getMockKey(pIdentificacao_type, pIdentificacao, pNumDI) {
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
            data[getMockKey('cpf', "83422726640", "0123456789")] = getDIMockEntregue('cpf', "83422726640", "0123456789", "ESTA E UMA DI ENTREGUE");
            data[getMockKey('cpf', "83422726640", "1234567890")] = getDIMockEntregueGUIA('cpf', "83422726640", "1234567890");
            data[getMockKey('cpf', "83422726640", "2345678901")] = getDIMockEntregueDARE('cpf', "83422726640", "2345678901");
            data[getMockKey('cnpj', "67695137000189", "3456789012")] = getDIMockEntregueComSaldoDevedor('cnpj', "67695137000189", "3456789012");

            //liberada
            data[getMockKey('cnpj', "67695137000189", "4567890123")] = getDIMockLiberadaComMensagem('cnpj', "67695137000189", "4567890123");
            data[getMockKey('cnpj', "67695137000189", "5678901234")] = getDIMockLiberadaGUIA('cnpj', '67695137000189', '5678901234');

            //nao liberada
            data[getMockKey('cnpj', "67695137000189", "6789012345")] = getDIMockNaoLiberadaBloqueada('cnpj', '67695137000189', '6789012345');
            data[getMockKey('cnpj', "67695137000189", "7890123456")] = getDIMockNaoLiberadaComMensagem('cnpj', '67695137000189', '7890123456');
            data[getMockKey('cnpj', "67695137000189", "8901234567")] = getDIMockNaoLiberadaComMensagemEDare('cnpj', '67695137000189', '8901234567');
            data[getMockKey('cnpj', "67695137000189", "9012345678")] = getDIMockNaoLiberadaComSaldoDevedorEDARE('cnpj', '67695137000189', '9012345678');
            data[getMockKey('cnpj', "67695137000189", "0123456789")] = getDIMockNaoLiberadaValorFaltante('cnpj', '67695137000189', '0123456789');            

            return data;
        }

        function getDIMockEntregueDARE(pIdentificacao_type, pIdentificacao, pNumDI) {
            var di = getDIMockEntregue(pIdentificacao_type, pIdentificacao, pNumDI, "ESTA E UMA DI ENTREGUE EXIBINDO DARE", null, constantsHelper.tipoDocumentoDI.DARE);
            return di;
        }

        function getDIMockEntregueGUIA(pIdentificacao_type, pIdentificacao, pNumDI) {
            var di = getDIMockEntregue(pIdentificacao_type, pIdentificacao, pNumDI, "ESTA E UMA DI ENTREGUE EXIBINDO GUIA", null, constantsHelper.tipoDocumentoDI.GUIA);
            return di;
        }

        function getDIMockEntregueComSaldoDevedor(pIdentificacao_type, pIdentificacao, pNumDI) {
            var di = getDIMockEntregue(pIdentificacao_type, pIdentificacao, pNumDI, "ESTA E UMA DI ENTREGUE COM SALDO DEVEDOR", 235.06);
            return di;
        }

        function getDIMockEntregue(pIdentificacao_type, pIdentificacao, pNumDI, nome, saldoDevedor, arquivoType) {
            var di = getDIMockBase(pIdentificacao_type, pIdentificacao, pNumDI, nome, constantsHelper.situacaoDI.entregue);

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

        function getDIMockLiberadaComMensagem(pIdentificacao_type, pIdentificacao, pNumDI) {
            var di = getDIMockLiberada(pIdentificacao_type, pIdentificacao, pNumDI, "ESTA E UMA DI LIBERADA COM MENSAGEM");
            di.mensagem = "Dirija-se ao Recinto Alfandegado para a emissão do Protocolo de Liberação e retirada da mercadoria.";

            return di;
        }

        function getDIMockLiberadaGUIA(pIdentificacao_type, pIdentificacao, pNumDI) {
            var di = getDIMockLiberada(pIdentificacao_type, pIdentificacao, pNumDI, "ESTA E UMA DI LIBERADA COM GUIA", null, constantsHelper.tipoDocumentoDI.GUIA);

            return di;
        }

        function getDIMockLiberada(pIdentificacao_type, pIdentificacao, pNumDI, nome, saldoDevedor, arquivoType) {
            var di = getDIMockBase(pIdentificacao_type, pIdentificacao, pNumDI, nome, constantsHelper.situacaoDI.liberada);

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

        function getDIMockNaoLiberadaValorFaltante(pIdentificacao_type, pIdentificacao, pNumDI) {
            var di = getDIMockNaoLiberada(pIdentificacao_type, pIdentificacao, pNumDI, "ESTA E UMA DI NAO LIBERADA COM VALOR FALTANTE", null, constantsHelper.tipoDocumentoDI.DARE);
            di.mensagem = "Pagamento antecipado inexistente ou insuficiente";
            di.somaValoresDI = 10511.26;
            di.valorBaseCalculo = 11944.61;
            di.valorPagamentoAntecipadoEsperado = 537.51;
            di.valorPagamentoAntecipadoEfetuado = 0;
            di.valorPagamentoAntecipadoAEfetuar = 537.51;

            return di;
        }

        function getDIMockNaoLiberadaBloqueada(pIdentificacao_type, pIdentificacao, pNumDI) {
            var di = getDIMockNaoLiberada(pIdentificacao_type, pIdentificacao, pNumDI, "ESTA E UMA DI NAO LIBERADA BLOQUEADA");
            di.mensagem = "DI bloqueada: Declaração do ICMS efetuada no SISCOMEX indica valor de imposto a pagar inferior ao esperado"
            di.valorDeclarado = 1482.77;
            di.valorEsperado = 1601.45;

            return di;
        }

        function getDIMockNaoLiberadaComMensagemEDare(pIdentificacao_type, pIdentificacao, pNumDI) {
            var di = getDIMockNaoLiberada(pIdentificacao_type, pIdentificacao, pNumDI, "ESTA E UMA DI NAO LIBERADA COM DARE E MENSAGEM", null, constantsHelper.tipoDocumentoDI.DARE);
            di.mensagem = "DI não recebida do SISCOMEX/SRF";
            return di;
        }

        function getDIMockNaoLiberadaComMensagem(pIdentificacao_type, pIdentificacao, pNumDI) {
            var di = getDIMockNaoLiberada(pIdentificacao_type, pIdentificacao, pNumDI, "ESTA E UMA DI NAO LIBERADA COM MENSAGEM");
            di.mensagem = "DI não recebida do SISCOMEX/SRF";
            return di;
        }

        function getDIMockNaoLiberadaComSaldoDevedorEDARE(pIdentificacao_type, pIdentificacao, pNumDI) {
            var di = getDIMockNaoLiberada(pIdentificacao_type, pIdentificacao, pNumDI, "ESTA E UMA DI NAO LIBERADA COM DARE E SALDO DEVEDOR", 7294.45, constantsHelper.tipoDocumentoDI.DARE);

            return di;
        }

        function getDIMockNaoLiberada(pIdentificacao_type, pIdentificacao, pNumDI, nome, saldoDevedor, arquivoType) {
            var di = getDIMockBase(pIdentificacao_type, pIdentificacao, pNumDI, nome, constantsHelper.situacaoDI.naoLiberada);

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

        function getDIMockBase(pIdentificacao_type, pIdentificacao, pNumDI, nome, situacao) {
            var di = {
                situacao: situacao,
                identificacao: {
                    Type: pIdentificacao_type,
                    Value: pIdentificacao
                },
                numero: pNumDI,
                nome: nome
            };

            return di;
        }
    }
};
