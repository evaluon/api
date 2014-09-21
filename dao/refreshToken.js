module.exports = function(app){

    var log = app.utils.log,
    Token = require('./token')(app),
    ClientToken = require('./clienttoken')(app),
    UserToken = require('./usertoken')(app);

    return {

        refreshToken: function(refreshToken){

            return ClientToken.findClientToken(
                refreshToken
            ).then(function(clientToken){

                if (!clientToken) {

                    return UserToken.findUserToken(
                        refreshToken
                    ).then(function(userToken){

                        if(!userToken) return false;

                        userId = userToken.UserId;
                        clientId = userToken.ClientId;

                        return Token.refreshToken(
                            refreshToken
                        ).then(function(token){

                            tokenId = token.id;

                            return UserToken.associateToken({
                                TokenId: tokenId,
                                UserId: userId,
                                ClientId: clientId
                            }).then(function(){
                                return token;
                            });

                        });

                    });

                }

                clientId = clientToken.ClientId;

                // Expira el token existente y crea uno nuevo
                return Token.refreshToken(
                    refreshToken
                ).then(function(token){
                    tokenId = token.id;

                    return ClientToken.associateToken({
                        ClientId: clientId,
                        TokenId: tokenId
                    }).then(function(){
                        return token;
                    });

                });


            });

        }

    }

}
