module.exports = function(app, sql){

    var q = app.utils.q;

    function processGroup(group){

        var response = { id: group.id };

        return sql.selectOne(
            'user', { id: group.evaluator_id }
        ).then(function(user){
            response.user = user;
            return sql.selectOne(
                'institution',
                { id: group.institution_id }
            );
        }).then(function(institution){
            response.institution = institution;
            return response;
        });

    }

    function processGroups(groups){

        var qs = [];
        for(group in groups){
            qs.push(processGroup(groups[group]));
        }
        return q.all(qs);

    }

    var self = {

        find: function(values){
            return sql.selectOne('group', values).then(processGroup);
        },

        findAll: function(values){
            return sql.select('group', values).then(processGroups);
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
