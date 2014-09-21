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
                    return token;
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
                return UserToken.find({
                    where: {
                        TokenId: token.id
                    }
                });
            }).then(function(userToken){
                if(!userToken){
                    return null;
                }
                return User.find(userToken.UserId);
            });
        },

        retrieveToken: function(user, client){

            return UserToken.findAll({
                include: [
                {
                    model: app.db.Token
                }
                ],
                where: {
                    ClientId: client.id,
                    UserId: user.id
                }
            }).then(function(userTokens){
                var availableTokens = _.filter(userTokens, function(uToken){
                    return uToken.token.expired == null;
                });

                if(availableTokens.length > 0){
                    return availableTokens[0].token;
                } else {
                    return false;
                }
            }).then(function(token){
                if(token){
                    if(token.expired){
                        return false;
                    } else {
                        return token;
                    }
                } else {
                    return false;
                }
            }).then(function(token){
                if(token){
                    return token;
                } else {
                    return Token.createToken().then(function(token){
                        return Dao.associateToken({
                            TokenId: token.id,
                            ClientId: client.id,
                            UserId: user.id
                        }).then(function(userToken){
                            return token;
                        });
                    });
                }
            });

        }

    };

    return Dao;

};
