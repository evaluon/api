module.exports = function(app){

    var Client = app.db.Client,
        log = app.utils.log,
        _ = app.utils._,
        crypto = require('crypto');

    return {

        retrieveClient: function(id, secret){
            return Client.find({ where: { id: id, secret: secret } });
        },

        createClient: function(client){
            return Client.create(
                _.extend(
                    {
                        secret: crypto.randomBytes(32).toString('base64')
                    },
                    _.omit(client, ['secret'])
                )
            );
        },

        updateClient: function(id, options){

            return Client.find(id).then(function(client){
                if(client){
                    return client.updateAttributes(options);
                } else {
                    throw ({"message": "Client not found"});
                }
            });

        },

        deleteClient: function(id) {

            return Client.find(id).then(function(client){
                return client.destroy();
            });

        }

    };

};
