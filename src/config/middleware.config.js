module.exports = function (builder) {
    builder.addModule(middlewareConfig);

	function middlewareConfig(app, router, cors, bodyParser, compression) {
		//definition
		var service = this;
		service.configPreMiddlewares = configPreMiddlewares;
		service.configPostMiddlewares = configPostMiddlewares;
		return service;
		
		//implementation	
		function configPreMiddlewares() {
            app.use(compression({level: 9})); //GZIP
			app.use(cors());
			app.use(bodyParser.json({limit: '1gb'}));
			app.use(bodyParser.urlencoded({
				extended: true,
                limit: '1gb'
			}));
		}

		function configPostMiddlewares() {
		
		}
	}
}