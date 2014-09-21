module.exports = function(app){

    var log = app.utils.log,

        UserToken = app.dao.usertoken,
        ClientToken = app.dao.clienttoken,
        RefreshToken = app.dao.refreshToken,
        Client = app.db.Client,
        User = app.db.User;

    // Create OAuth 2.0 Authorization Server
    var oauth2orize = app.utils.oauth2orize,
        passport = app.utils.passport,
        server = oauth2orize.createServer();

    // Exchange client credentials for access token.
    server.exchange(oauth2orize.exchange.clientCredentials(
        function(client, scope, done) {

            ClientToken.retrieveToken(client).then(function(token){
                if(token){
                    done(null, token.accessToken, token.refreshToken);
                } else {
                    done(null, false);
                }
            }).catch(done).error(done);

        }
    ));

    // Exchange username & password for access token.
    server.exchange(oauth2orize.exchange.password(
        function(client, username, password, scope, done) {

            User.find({
                where: {
                    mail: username,
                    password: password
                }
            }).then(function(user){
                if(user){
                    return UserToken.retrieveToken(user, client)
                } else {
                    return false;
                }
            }).then(function(token){
                if(token){
                    done(null, token.accessToken, token.refreshToken);
                } else {
                    done(null, false);
                }
            }).catch(done).error(done);

        }
    ));

    // Exchange refreshToken for access token.
    server.exchange(oauth2orize.exchange.refreshToken(
        function(client, refreshToken, scope, done) {

            RefreshToken.refreshToken(refreshToken).then(function(token){
                if(token) done(null, token.accessToken, token.refreshToken);
                else done(null, false);
            }).catch(done).error(done);

        }
    ));

    // Token authorization server endpoint
    return [
    passport.authenticate(['bearer', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
    ];

};
