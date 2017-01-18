module.exports = function (builder) {
    builder.addModule(processoService);

    function processoService() {
        //definition
        var service = this;
        service.listar = listar;
        return service;

        //implementation
        function listar(numeroProcesso, callback) {
            if (typeof numeroProcesso == "undefined" || numeroProcesso == "") {
                return callback("Parametro de query numeroProcesso é obrigatorio!");
            }

            if(numeroProcesso == 1600000025457) {
                return callback(null, getProcessoMockUm());
            }

            if(numeroProcesso == 1600000025456) {
                return callback(null, getProcessoMockDois());
            }

            if (numeroProcesso == 12345) {
                return callback(null, [
                    getProcessoMock(123451),
                    getProcessoMock(123452),
                    getProcessoMock(123453)
                ]);
            } else if (numeroProcesso == 11111) {
                return callback(null, [getProcessoMock(11111)]);
            } else {
                return callback("Não existem processos para o numero informado.");
            }
        }

        function getProcessoMock(numero) {
            if (!numero) {
                numero = getRandomNumber();
            }
            var processo = {
                "Rede": "REST - Restituição de Tributo " + numero,
                "NumeroProcesso": numero,
                "Cliente": "CERVEJARIA TAQUARAS LTDA " + numero,
                "Status": "Análise Gerente Regional " + numero,
                "EstadoDoProcesso": "INICIADO " + numero,
                "Atualizacao": "2004-02-12T15:19:21",
                "ListaDeDocumentos": [
                    getProcessoDocumentoMock(),
                    getProcessoDocumentoMock(),
                    getProcessoDocumentoMock()
                ]
            };
            return processo;
        }

        function getProcessoMockUm() {
            var processo = {
                "Rede": "REST - Restituição de Tributo ",
                "NumeroProcesso": 1600000025457,
                "Cliente": "CERVEJARIA TAQUARAS LTDA ",
                "Status": "Análise Gerente Regional ",
                "EstadoDoProcesso": "INICIADO ",
                "Atualizacao": "2016-12-07T16:22:34",
                "ListaDeDocumentos": [
                    {
                        "Numero": 1600000025457,
                        "Descricao": "REST - Requerimento de Restituição de Tributos",
                        "Rede": "REST - Restituição de Tributo",
                        "Data": "2016-11-30T08:58:05",
                        "Arquivo": "http://www.sef.sc.gov.br"
                    }
                ]
            }
            return processo;
        }

        function getProcessoMockDois() {
            var processo = {
                "Rede": "REST - Restituição de Tributo ",
                "NumeroProcesso": 1600000025456,
                "Cliente": "COMERCIO E TRANSPORTES MASONDA LTDA EPP-",
                "Status": "Aguardando Entrega de Documentos",
                "EstadoDoProcesso": "INICIADO ",
                "Atualizacao": "2016-11-30T08:26:13",
                "ListaDeDocumentos": [
                    {
                        "Numero": 1600000025456,
                        "Descricao": "REST - Requerimento de Restituição de Tributos",
                        "Rede": "REST - Restituição de Tributo",
                        "Data": "2016-11-30T08:26:11",
                        "Arquivo" : "http://www.sef.sc.gov.br"
                    }
                ]
            }
            return processo;
        }

        function getProcessoDocumentoMock(numero) {
            if (!numero) {
                numero = getRandomNumber();
            }
            var documento = {
                "Numero": numero,
                "Descricao": "REST - Requerimento de Restituição de Tributo " + numero,
                "Rede": "REST - Restituição de Tributo " + numero,
                "Data": "2004-02-12T15:19:21",
                "Arquivo": "http://www.sef.sc.gov.br"
            };
            return documento;
        }

        function getRandomNumber() {
            return Math.floor(Math.random() * 1000000) + 9999999;
        }
    }
};
