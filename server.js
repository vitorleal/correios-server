var restify  = require('restify'),
    Correios = require('node-correios'),
    correios = new Correios(),
    server   = restify.createServer({ name: 'node-correios' });


//Config
server.use(function crossOrigin(req, res, next) {
  res.charSet('utf-8');
  res.setHeader('Server', 'node/correios');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

  return next();
});
server.use(restify.queryParser());


//Frete route
server.get('/frete', function (req, res, next) {
  correios.calcPreco(req.params, function (r) {
    res.send({
      response: r
    });

    return next();
  });
});


//Frete prazo route
server.get('/frete/prazo', function (req, res, next) {
  correios.calcPrecoPrazo(req.params, function (r) {
    res.send({
      response: r
    });

    return next();
  });
});


//Busca CEP
server.get('/cep/:cep', function (req, res, next) {
  var cep = req.params.cep || '00000000';

  correios.consultaCEP({cep: cep }, function (r) {
    res.send(r);

    return next();
  });

});


//Listen
var port = process.env.PORT || 5000;

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});

