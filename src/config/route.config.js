module.exports = function (builder) {
    builder.addModule(routeConfig);

    function routeConfig(express, app, router) {
        //definition
        var service = this;
        service.config = config;
        return service;
		
        //implementation	
        function config() {
            //registrar rotas da api
            app.use('/api', router);
        }
    }
}