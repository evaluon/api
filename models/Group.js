module.exports = function(app, sql){

    var self = {

        find: function(values){
            return sql.selectOne('group', values);
        },

        findAll: function(values){
            return sql.select('group', values);
        },

        create: function(object){
            return sql.insert('group', object).then(function(){
                return self.find({id: object.id});
            });
        },

        update: function(id, object){
            return sql.update('group', object, { id: id });
        },

        destroy: function(id){
            return sql.delete('group', { id: id });
        },

        groupPeriods: function(id){
            return sql.one(
                'SELECT p.* ' +
                'FROM periods_in_group pg, period p ' +
                'WHERE pg.group_id = ? AND ' +
                '   p.id = pg.period_id AND ' +
                '   NOW() BETWEEN start_date AND stop_date'
                , [id]
            ).then(function(gP){
                if(!gP) throw { message: "no_active_period", statusCode: 404 };
                return gP;
            });
        },

        setPeriod: function(id){
            return sql.one(
                'SELECT ' +
                '   p.* ' +
                'FROM ' +
                '   period p, institution i, `group` g ' +
                'WHERE ' +
                '   g.id = ? AND ' +
                '   i.id = g.institution_id AND ' +
                '   p.institution_id = i.id AND ' +
                '   NOW() BETWEEN p.start_date AND p.stop_date '
                , [id]
            ).then(function(period){
                return sql.insert(
                    'periods_in_group',
                    {
                        period_id: period.id,
                        group_id: id
                    }
                );
            });
        }

    };

    return self;

}
