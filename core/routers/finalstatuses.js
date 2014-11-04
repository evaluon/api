module.exports = function(app){

    var router = app.router,
        log = app.utils.log;

    // 404 Middleware: Final Middleware matches routes that aren't registered
    router.use(function(req, res) {
        res.status(404);
        var responseView = require('../../views/jsonStdResponse');
        responseView({ "message": "Method not found" }, null, res);
    });

    // Error Middleware: Matches Server Error Routes
    router.use(function(err, req, res, next){
        log.error(err.stack);
        var responseView = require('../../views/jsonErrorResponse');
        responseView(err, res);
    });

    app.router = router;
    return app;

}
