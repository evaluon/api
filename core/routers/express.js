module.exports = function(app, express){

    var log = app.utils.log,
        passport = app.utils.passport,

        approutes = app.routes;

    app = require('./middleware')(app, express);

    var router = app.router,
        cors = app.utils.cors;

    for(module in approutes){

        var module = approutes[module];

        for(route in module){
            var rt = module[route];

            if(rt.cors){
                cors.registerRoute(rt.url, rt.method);
            }

            router[rt.method](rt.url,
                passport.authenticate('bearer'),
                rt.action
            );

        }

    }

    app.router = router;
    return app;


};
