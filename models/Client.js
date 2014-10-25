module.exports = function(app, sql){

    var log = app.utils.log,
        _ = app.utils._;

    self = {

        find: function(values){
            return sql.selectOne('client', values);
        },

        findAll: function(values){
            return sql.select('client', values);
        },

        create: function(client){
            return sql.insert('client', client).then(function(){
                return self.find({id: client.id});
            });
        },

        update: function(id, client){
            return sql.update('client', client, { id: id });
        },

        destroy: function(id){
            return sql.delete('client', { id: id });
        }

    };

    return self;

}
