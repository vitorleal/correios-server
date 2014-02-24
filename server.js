var restify  = require('restify'),
    Correios = require('node-correios'),
    correios = new Correios(),
    server   = restify.createServer({ name: 'node-correios', url: 'http://127.0.0.1' });


//Config
server
  .use(function crossOrigin(req,res,next) {
    res.setHeader('Server', 'node/correios');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    return next();
  })
  //.use(restify.fullResponse())
  .use(restify.queryParser());


//Frete route
server.get('/frete', function (req, res, next) {
  var price = correios.getPriceSync(req.query, function (price) {
    res.send(price);
  });
});


//Listen
server.listen(4000, function () {
  console.log('%s listening at %s', server.name, server.url);
});

