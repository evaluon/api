module.exports = function(app, sql){

    var log = app.utils.log,
        _ = app.utils._;

    var Dao = {

        find: function(values){
            return sql.selectOne('users', values).then(function(user){
                if(user) {
                    return user;
                } else throw {
                    statusCode: 404,
                    message: 'user_not_found'
                };
            });
        },

        findAll: function(values){
            return sql.select('users', values);
        },

        create: function(user){
            return sql.insert('user', user).then(function(res){
                return Dao.find({id: user.id });
            });
        },

        update: function(id, user){
            user = _.omit(user, 'enabled');
            return sql.update('user', user, { id: id }).then(function(res){
                return sql.selectOne('user', { id: id });
            });
        },

        destroy: function(id){
            return Dao.find({ id: id }).then(function(user){
                if(user) {
                    if(user.enabled) {
                        return sql.insert('disabled_users', { id: id });
                    } else {
                        return sql.delete('disabled_users', { id: id });
                    }
                } else throw {
                    statusCode: 404,
                    message: 'user_not_found'
                };
            });
        }

    };

    return Dao;

}
