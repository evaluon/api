module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        UserToken = app.db.UserToken,
        Token = require('./token')(app),
        User = app.db.User;

    var Dao = {

        findUserToken: function(rToken){
            return Token.retrieveRefreshToken(rToken).then(function(token){
                if(token){
                    return UserToken.find({
                        token_id: token.id
                    }).then(function(token){
                        return token || false;
                    });
                } else {
                    return false;
                }
            });
        },

        associateToken: function(association){
            return UserToken.create(association);
        },

        retrieveUser: function(accessToken){
            return Token.retrieveToken(accessToken).then(function(token){
                if(!token){
                    return null;
                }
                return UserToken.find({ token_id: token.id });
            }).then(function(userToken){
                if(!userToken){
                    return null;
                }
                return User.find({ id: userToken.user_id });
            });
        },

        retrieveToken: function(user){

            return UserToken.findActive(
                client.id
            ).then(function(token){
                return token || false;
            }).then(function(token){
                if(token){
                    return token;
                } else {
                    return Token.createToken().then(function(token){
                        return Dao.associateToken({
                            token_id: token.id,
                            user_id: user.id
                        }).then(function(){
                            return token;
                        });
                    });
                }
            });

        }

    };

    return Dao;

};
