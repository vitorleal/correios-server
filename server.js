var restify  = require('restify'),
    Correios = require('node-correios'),
    correios = new Correios(),
    server   = restify.createServer({ name: 'node-correios' });


//Config
server
  .use(function crossOrigin(req,res,next) {
    res.setHeader('Server', 'node/correios');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    return next();
  })
  .use(restify.queryParser());


//Frete route
server.get('/frete', function (req, res, next) {
  correios.getPriceSync(req.params, function (p) {
    res.send(p);

    return next();
  });
});


//Listen
var port = process.env.PORT || 5000;
server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});

