module.exports = function(app){

    app.utils.nodemailer.setTransporter(app.config.mail);

    return app;

}
