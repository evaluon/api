module.exports = function(app){

    var Client = app.db.Client,
        log = app.utils.log,
        _ = app.utils._,
        crypto = require('crypto');

    return {

        retrieveClient: function(id, secret){
            return Client.find({ pk_id: id, secret: secret });
        },

        createClient: function(client){
            return checkFields(['id', 'name'], client).then(function(){
                client = _.extend(
                    {
                        secret: crypto.randomBytes(32).toString('base64'),
                        role_id: 'admin'
                    },
                    _.omit(client, ['secret'])
                )
                return Client.create(client);
            });
        },

        updateClient: function(id, options){

            return Client.find({pk_id: id}).then(function(client){
                if(client){
                    return Client.update(id, options);
                } else {
                    throw {
                        message: "client_not_found", statusCode: 404 
                    };
                }
            });

        },

        deleteClient: function(id) {

            return Client.find(id).then(function(client){
                return Client.destroy(id);
            });

        }

    };

};
