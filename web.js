var express           = require('express'),
	path              = require('path'),
    app               = express(),
    server            = require('http').createServer(app)
    ;

setupMiddlewares();
startServer();

function startServer () {
  app.set('port', process.env.PORT || 3000);

  server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
  });
}

function setupMiddlewares () {
  app.use(express.static(path.join(__dirname, 'app')));
}

module.exports = app;