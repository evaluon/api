module.exports = function(app, express){

    var cors = app.utils.cors,
        router = express.Router(),
        log = app.utils.log;

    // CORS Middleware: Match URL Route and HTTP Method with CORS enabled.
    router.options('*', cors.matchUrl, function(req, res){
        res.json(200, {});
    });
    router.use(cors.match);

    // Mailer Middleware: add nodemailer to req
    router.use(function(req, res, next){
        req.mail = app.utils.nodemailer;
        next();
    });

    // Log Middleware: Log Client Requests
    router.use(function(req, res, next) {
        log.info(req.method, req.path);
        next();
    });

    app.router = router;
    app.utils.cors = cors;

    return app;

}
