module.exports = function(app, sql){

    var _ = app.utils._,
        log = app.utils.log
        hotp = app.utils.hotp,
        salt = app.config.security.salt,
        moment = app.utils.moment;

    var self = {

        find_evaluee: function(id){
            return sql.selectOne('test', { id: id });
        },

        find_evaluator: function(id){
            return self.find_evaluee(id).then(function(test){
                return _.extend({ hotp: hotp(salt, id) }, test);
            });
        },

        findAll: function(values){
            return sql.query(
                'SELECT t.* FROM test t, group_test gt ' +
                'WHERE t.id = gt.test_id'
            );
        },

        find: function(object){
            return sql.selectOne('test', object);
        },

        create: function(object){
            object.start_date = new Date(
                moment.tz(object.start_date, "America/Bogota")
            );
            object.end_date = new Date(
                moment.tz(object.end_date, "America/Bogota")
            );
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
