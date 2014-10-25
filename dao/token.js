module.exports = function(app){

    var crypto = app.utils.crypto,
        log = app.utils.log,
        _ = app.utils._,

        Token = app.db.Token;

    var Dao = {

        retrieveToken: function(accessToken){
            return Token.find({ access_token: accessToken });
        },

        retrieveRefreshToken: function(refreshToken){
            return Token.find({ refresh_token: refreshToken });
        },

        createToken: function(){

            var newToken = {
                access_token: crypto.randomBytes(64).toString('base64'),
                refresh_token: crypto.randomBytes(64).toString('base64'),
                issued: new Date()
            }

            return Token.create(newToken);

        },

        expireToken: function(id) {

            return Token.find(id).then(function(){
                return Token.update(id, { expired: new Date() });
            });

        },

        refreshToken: function(refreshToken){

            return Token.find({
                refresh_token: refreshToken
            }).then(function(token){
                return Dao.expireToken(token.id);
            }).then(function(){
                return Dao.createToken();
            });

        }

    };

    return Dao;

};
