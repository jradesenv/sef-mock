module.exports = function (builder) {
    builder.addModule(processoResource);

    function processoResource(router, processoService, responseHelper) {
        // definition
        
        router.get(
            '/processo', 
            listar
        );
        
        // implementation        
        function listar(req, res, next) {
            processoService.listar(req.query.numeroProcesso, function (err, lista) {
                if(err) {
                    return responseHelper.sendError(res, err, next);
                }
                return responseHelper.sendSuccess(res, lista, next)
            });
        }
    }
};
