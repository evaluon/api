module.exports = function(app){

    var crypto = app.utils.crypto,
    log = app.utils.log,
    _ = app.utils._,

    Token = app.db.Token,
    User = app.db.User,
    UserToken = app.db.UserToken,
    Client = app.db.Client,
    ClientToken = app.db.ClientToken;

    var Dao = {

        retrieveToken: function(accessToken){

            return Token.find({
                where: { accessToken: accessToken }
            });

        },

        retrieveRefreshToken: function(refreshToken){

            return Token.find({
                where: { refreshToken: refreshToken }
            });

        },

        createToken: function(){

            var newToken = {
                accessToken: crypto.randomBytes(64).toString('base64'),
                refreshToken: crypto.randomBytes(64).toString('base64')
            }

            return Token.create(newToken);

        },

        expireToken: function(id) {

            return Token.find(id).then(function(token){
                return token.destroy();
            });

        },

        refreshToken: function(refreshToken){

            return Token.find({
                where: { refreshToken: refreshToken }
            }).then(function(token){
                return Dao.expireToken(token.id);
            }).then(function(){
                return Dao.createToken();
            });

        }

    };

    return Dao;

};
