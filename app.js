'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

var db = require('./api/controllers/db');

app.locals.db = db;

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};


app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
}});


SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
