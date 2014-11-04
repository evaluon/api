module.exports = function(app, sql){

    var log = app.utils.log;

    var self = {

        find: function(values){
            return sql.selectOne('period', values);
        },

        findAll: function(institution_id){
            return sql.query(
                'SELECT * FROM period WHERE institution_id = ? '
                + 'AND stop_date >= ?'
                , [institution_id, new Date()]
            );
        },

        create: function(object){
            return sql.insert('period', object).then(function(result){
                return sql.selectOne('period', { id: result.insertId });
            });
        },

        update: function(id, object){
            return sql.update('period', object, { id: id });
        },

        destroy: function(id){
            return sql.delete('period', { id: id });
        }

    };

    return self;

}
