module.exports = function(app){

    var _ = app.utils._,
        ClientToken = app.db.ClientToken,
        Token = require('./token')(app),
        Client = app.db.Client;

    var Dao = {

        findClientToken: function(rToken){
            return Token.retrieveRefreshToken(rToken).then(function(token){
                if(token){
                    return token;
                } else {
                    return false;
                }
            });
        },

        associateToken: function(association){
            return ClientToken.create(association);
        },

        retrieveClient: function(accessToken){
            return Token.retrieveToken(accessToken).then(function(token){
                if(!token){
                    return null;
                }
                return ClientToken.find({
                    where: {
                        TokenId: token.id
                    }
                });
            }).then(function(clientToken){
                if(!clientToken){
                    return null;
                }
                return Client.find(clientToken.ClientId);
            });
        },

        retrieveToken: function(client){

            return ClientToken.findAll({
                include: [
                {
                    model: app.db.Token
                }
                ],
                where: {
                    ClientId: client.id
                }
            }).then(function(clientToken){
                var availableTokens = _.filter(clientToken, function(cToken){
                    return cToken.token.expired == null;
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
                            ClientId: client.id
                        });
                    });
                }
            });

        }

    };

    return Dao;

};
