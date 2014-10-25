module.exports = function(app){

    var UserToken = app.dao.usertoken,
        ClientToken = app.dao.clienttoken,
        Client = app.db.Client;

    var log = app.utils.log;

    var passport = app.utils.passport;

    var BasicStrategy           = require('passport-http').BasicStrategy;
    var ClientPasswordStrategy  = require('passport-oauth2-client-password').Strategy;
    var BearerStrategy          = require('passport-http-bearer').Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new ClientPasswordStrategy(
        function(clientId, clientSecret, done) {

            Client.find({
                id: clientId,
                secret: clientSecret
            }).then(function(client){
                done(null, client || false);
            }).catch(done);

        }
    ));

    passport.use(new BearerStrategy(
        function(accessToken, done) {

            ClientToken.retrieveClient(
                accessToken
            ).then(function(client){
                return client || UserToken.retrieveUser(accessToken);
            }).then(function(user){
                done(null, user || false);
            }).catch(done);

        }
    ));


};
