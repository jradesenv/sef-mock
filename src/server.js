var express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    path = require('path'),
    builder = require('dibuilder'),
    router = express.Router();

//adiciona modulos já instanciados/configurados
builder.addInstance('express', express);
builder.addInstance('path', path);
builder.addInstance('router', router);
builder.addInstance('app', app);

//indica ao builder aonde procurar por novos modulos
builder.loadModules(path.join(__dirname, './helpers'));
builder.loadModules(path.join(__dirname, './domain'));
builder.loadModules(path.join(__dirname, './resources'));
builder.loadModules(path.join(__dirname, './middlewares'));
builder.loadModules(path.join(__dirname, './config'));

//constroi os modulos injetando as dependencias
builder.build(function (serverConfig) {
    //inicia o servidor
    serverConfig.start();
    //setTimeout(function () {
    //   console.log = function(){};
    //}, 500);
});  