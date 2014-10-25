module.exports = function(app, sql){

    var log = app.utils.log,
        _ = app.utils._;

    var Dao = {

        find: function(values){
            return sql.selectOne('user', values);
        },

        findAll: function(values){
            return sql.select('user', values);
        },

        create: function(user){
            return sql.insert('user', user).then(function(res){
                return Dao.find({id: res.insertId });
            });
        },

        update: function(id, user){
            return sql.update('user', user, { id: id });
        },

        destroy: function(id){
            return sql.delete('user', { id: id });
        }

    };

    return Dao;

}
