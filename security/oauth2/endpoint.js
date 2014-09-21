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
                where: {
                    id: clientId,
                    secret: clientSecret
                }
            }).then(function(client){
                if(client){
                    done(null, client);
                } else {
                    done(null, false);
                }
            }).error(done).catch(done);

        }
    ));

    passport.use(new BearerStrategy(
        function(accessToken, done) {

            ClientToken.retrieveClient(accessToken).then(function(client){
                if(client){
                    return client;
                } else {
                    return UserToken.retrieveUser(accessToken);
                }
            }).then(function(user){
                if(user){
                    done(null, user);
                } else {
                    done(null, false);
                }
            }).catch(done).error(done);

        }
    ));


};
