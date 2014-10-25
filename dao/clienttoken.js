module.exports = function(app){

    var _ = app.utils._,
    log = app.utils.log,
    ClientToken = app.db.ClientToken,
    Token = require('./token')(app),
    Client = app.db.Client;

    var Dao = {

        findClientToken: function(rToken){
            return Token.retrieveRefreshToken(rToken).then(function(token){
                return ClientToken.find({
                    token_id: token.id
                }).then(function(token){
                    return token || false;
                }) || false;
            });
        },

        associateToken: function(association){
            return ClientToken.create(association);
        },

        retrieveClient: function(accessToken){
            return Token.retrieveToken(accessToken).then(function(token){
                return ClientToken.find({ token_id: token.id }) || false;
            }).then(function(clientToken){
                return clientToken ? (
                    Client.find({ id: clientToken.client_id })
                ) : false;
            });
        },

        retrieveToken: function(client, createToken){

            return ClientToken.findActive(
                client.id
            ).then(function(clientToken){
                return Token.find({ id: clientToken.client_id }) || false;
            }).then(function(token){
                return token || createToken ? (
                    Token.createToken().then(function(token){
                        return Dao.associateToken({
                            token_id: token.id,
                            client_id: client.id
                        }).then(function(){
                            return token;
                        });
                    })
                ) : false;
            });

        }

    };

    return Dao;

};
