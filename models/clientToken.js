module.exports = function(app, sql){

    var log = app.utils.log,
    _ = app.utils._;

    var Dao = {

        find: function(values){
            return sql.selectOne('client_token', values);
        },

        findAll: function(values){
            return sql.select('client_token', values);
        },

        findActive: function(id){
            return sql.one(
                "SELECT t.* FROM token t, client_token ct WHERE " +
                "ct.token_id = t.id " +
                "AND ct.client_id = ? " +
                "AND expired IS NULL", [id]
            );
        },

        create: function(client_token){
            return sql.insert('client_token', client_token).then(function(){
                return Dao.find(client_token);
            });
        },

        update: function(old_client_token, client_token){
            return sql.update('client_token', client_token, old_client_token);
        },

        destroy: function(client_token){
            return sql.delete('client_token', client_token);
        }

    };

    return Dao;

}
