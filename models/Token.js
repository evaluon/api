module.exports = function(app, sql){

    var log = app.utils.log,
        _ = app.utils._;

    var Dao = {

        find: function(values){
            return sql.selectOne('token', values);
        },

        findAll: function(values){
            return sql.select('token', values);
        },

        create: function(client){
            return sql.insert('token', token).then(function(){
                return Dao.find({id: token.id});
            });
        },

        update: function(id, token){
            return sql.update('token', token, { id: id });
        },

        destroy: function(id){
            return sql.delete('token', { id: id });
        }

    };

    return Dao;

}
