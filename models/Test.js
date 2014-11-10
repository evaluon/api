module.exports = function(app, sql){

    var _ = app.utils._,
        log = app.utils.log
        hotp = app.utils.hotp,
        salt = app.config.security.salt;

    var self = {

        find_evaluee: function(id){
            return sql.selectOne('test', { id: id });
        },

        find_evaluator: function(id){
            return self.find_evaluee(id).then(function(test){
                return _.extend({ hotp: hotp(salt, test.id) }, test);
            });
        },

        findAll: function(values){
            return sql.query(
                'SELECT t.* FROM test t, group_test gt ' +
                'WHERE t.id = gt.test_id'
            );
        },

        create: function(object){
            return sql.insert(
                'test',
                _.extend({ create_date: new Date() }, object)
            ).then(function(result){
                return self.find({ id: result.insertId });
            });
        },

        update: function(id, object){
            return sql.update('test', object, { id: id }).then(function(res){
                return sql.selectOne('test', { id: id });
            });
        },

        destroy: function(id){
            return sql.delete('test', { id: id });
        }

    }

    return self;

}
