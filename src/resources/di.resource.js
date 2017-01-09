module.exports = function (builder) {
    builder.addModule(diResource);

    function diResource(router, diService, responseHelper) {
        // definition
        
        router.get(
            '/di', 
            consultar
        );
        
        // implementation        
        function consultar(req, res, next) {
            diService.consultar(req.query.pIdentificacao_type, req.query.pIdentificacao, req.query.pNumDI, function (err, lista) {
                if(err) {
                    return responseHelper.sendError(res, err, next);
                }
                return responseHelper.sendSuccess(res, lista, next)
            });
        }
    }
};
