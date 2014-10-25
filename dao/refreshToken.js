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

                        userId = userToken.user_id;

                        return Token.refreshToken(
                            refreshToken
                        ).then(function(token){

                            tokenId = token.id;

                            return UserToken.associateToken({
                                token_id: tokenId,
                                user_id: userId
                            }).then(function(){
                                return token;
                            });

                        });

                    });

                } else {
                        clientId = clientToken.client_id;

                    // Expira el token existente y crea uno nuevo
                    return Token.refreshToken(
                        refreshToken
                    ).then(function(token){
                        tokenId = token.id;

                        return ClientToken.associateToken({
                            client_id: clientId,
                            token_id: tokenId
                        }).then(function(){
                            return token;
                        });

                    });

                }


            });

        }

    }

}
