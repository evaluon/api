module.exports = function(app, sql){

    var log = app.utils.log;

    var self = {

        find: function(values){
            return sql.selectOne('period', values);
        },

        findAll: function(institution_id){
            return sql.query(
                'SELECT * FROM period WHERE institution_id = ? '
                + 'AND stop_date >= ? GROUP BY start_date ASC'
                , [institution_id, new Date()]
            ).then(function(periods){
                if(periods.length == 0) throw {
                    statusCode: 404,
                    message: "no_active_period"
                };
                return periods;
            });
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
