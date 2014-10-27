module.exports = function(app, sql){

    var _ = app.utils._,
        log = app.utils.log;

    var self = {

        find: function(values){
            return sql.selectOne('test', values);
        },

        findAll: function(values){
            return sql.select('test', values);
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
