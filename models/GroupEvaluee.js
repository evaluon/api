module.exports = function(app, sql){

    var Q = app.utils.q,
    _ = app.utils._,
    log = app.utils.log;

    var self = {

        groupEvaluees: function(group_id){
            return sql.query(

                'SELECT ' +
                '   e.* ' +
                'FROM ' +
                '   group_evaluees g, evaluees e ' +
                'WHERE ' +
                '   g.group_id = ? AND ' +
                '   g.evaluee_id = e.id AND ' +
                '   g.disabled IS NULL'
                , [ group_id ]
            );
        },

        addEvaluees: function(users, group_id){

            qs = [];

            for(user in users){
                user = users[user];

                qs.push(
                    sql.selectOne('evaluee', {id: user}).then(function(u){
                        return !u ? { id: user } : null;
                    })
                );
            }

            return Q.all(qs).then(function(evaluees){
                var filtered = _.filter(
                    evaluees, function(e){ return e != null }
                );
                if(filtered.length > 0){
                    throw {
                        message: "not_evaluees",
                        userList: filtered,
                        statusCode: 403
                    }
                } else {

                    return Q.all(
                        _.map(users, function(user){
                            return sql.selectOne(
                                'group_evaluees', {
                                    evaluee_id: user,
                                    group_id: group_id
                                }
                            ).then(function(evalueeInGroup){
                                if(evalueeInGroup){
                                    return sql.update(
                                        'group_evaluees', { disabled: null }, {
                                            evaluee_id: user,
                                            group_id: group_id
                                        }
                                    );
                                } else {
                                    return sql.insert(
                                        'group_evaluees', {
                                            evaluee_id: user,
                                            group_id: group_id
                                        }
                                    );
                                }
                            });
                        })
                    );

                }
            });

        },

        deleteEvaluee: function(evaluee, group){

            return sql.update(
                'group_evaluees', { disabled: true },
                { evaluee_id: evaluee, group_id: group }
            );

        }

    };

    return self;

}
