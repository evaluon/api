module.exports = function(app, express){

    app = require('./routers/mailer')(app);
    app = require('./routers/express')(app, express);
    app = require('./routers/oauth2')(app);
    app = require('./routers/finalstatuses')(app);
    
    return app;

};
