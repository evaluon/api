var bodyParser = require('body-parser');

module.exports = function(app){

    var srv = app.express(),
        log = app.utils.log;

    srv.use(function(req, res, next){
        res.header("X-Powered-By", "Bool Inc. PLAeX MVC Framework v1.0.1");
        next();
    });
    srv.set('host', process.env.HOSTNAME || '0.0.0.0');
    srv.set('port', process.env.PORT || 3004);
    srv.use(bodyParser.urlencoded({extended: true}));
    srv.use(bodyParser.json());

    srv.use(app.utils.passport.initialize());
    app = require('./router')(app, app.express);
    srv.use(app.router);

    return srv;

};
