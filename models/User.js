module.exports = function(app, sql){

    var log = app.utils.log,
        _ = app.utils._;

    var Dao = {

        find: function(values){
            return sql.selectOne('user', values).then(function(user){
                if(user) {
                    return user;
                } else throw {
                    statusCode: 404,
                    message: 'user_not_found'
                };
            });
        },

        findAll: function(values){
            return sql.select('user', values);
        },

        create: function(user){
            return sql.insert('user', user).then(function(res){
                return Dao.find({id: user.id });
            });
        },

        update: function(id, user){
            return sql.update('user', user, { id: id }).then(function(res){
                return sql.selectOne('user', { id: id });
            });
        },

        destroy: function(id){
            return sql.delete('user', { id: id });
        }

    };

    return Dao;

}
