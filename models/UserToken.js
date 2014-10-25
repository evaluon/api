module.exports = function(app, sql){

    var log = app.utils.log,
    _ = app.utils._;

    var Dao = {

        find: function(values){
            return sql.selectOne('user_token', values);
        },

        findAll: function(values){
            return sql.select('user_token', values);
        },

        findActive: function(id){
            return sql.one(
                "SELECT t.* FROM token t, user_token ut WHERE " +
                "ut.token_id = t.id " +
                "AND ut.user_id = ? " +
                "AND expired IS NULL", [id]
            );
        },

        create: function(user_token){
            return sql.insert('user_token', user_token).then(function(){
                return Dao.find(user_token);
            });
        },

        update: function(old_user_token, user_token){
            return sql.update('user_token', user_token, old_user_token);
        },

        destroy: function(user_token){
            return sql.delete('user_token', user_token);
        }

    };

    return Dao;

}
