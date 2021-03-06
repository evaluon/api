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
            user.birth_date = new Date(user.birth_date);
            return sql.query(
                "SELECT * FROM user WHERE id = ? UNION " +
                "SELECT * FROM user WHERE mail = ?",
                [user.id, user.mail]
            ).then(function(res){
                if(res.length > 0) throw {
                    statusCode: 403,
                    message: 'existing_user'
                };
                return null;
            }).then(function(){
                return sql.insert('user', user)
            }).then(function(res){
                return Dao.find({id: user.id });
            });
        },

        update: function(id, user){
            if(user.birth_date !== undefined){
                user.birth_date = new Date(user.birth_date);
            }
            if(user.register_date !== undefined){
                user.register_date = new Date(user.register_date);
            }
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
