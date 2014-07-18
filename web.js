 app.set('port', 80);

 server.listen(app.get('port'), function () {
   console.log('Express server listening on port ' + server.address().port);
 });