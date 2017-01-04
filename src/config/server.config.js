module.exports = function (builder) {
    builder.addModule(serverConfig);

    function serverConfig(app, middlewareConfig, constantsHelper, routeConfig, path) {
        //definition
        var service = this;
        service.start = start;
        return service;

        //implementation
        function start(callback) {
            var appPort = constantsHelper.port;
            var server = app.listen(appPort, function () {
                globalConfig(function () {
                    middlewareConfig.configPreMiddlewares();
                    routeConfig.config();
                    middlewareConfig.configPostMiddlewares();
                    console.log('Iniciado na porta: ' + appPort);
                    if (callback)
                        callback(server);
                });
            });
        }

        function globalConfig(callback) {
            global.__rootPath = path.resolve(__dirname.split('config')[0]);

            callback();
        }
    }
}