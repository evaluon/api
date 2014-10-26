module.exports = function(app, sql){

    var q = app.utils.q,
    _ = app.utils._;

    var self = {

        groupEvaluees: function(group_id){
            return sql.query(

                'SELECT ' +
                '   u.id, u.first_name, u.middle_name, u.last_name, u.mail, ' +
                '   e.disabled ' +
                'FROM ' +
                '   group_evaluees g, evaluee e, user u ' +
                'WHERE ' +
                '   g.group_id = ? AND ' +
                '   g.evaluee_id = e.id AND ' +
                '   e.id = u.id'

                , [ group_id ]
            );
        },

        addEvaluees: function(users, group_id){

            return sql.beginTransaction(

            ).then(function(){
                return q.all(
                    _.map(users, function(user){
                        return sql.select(
                            'evaluee', {id: user }
                        ).then(function(evaluee){
                            if(!evaluee) return {
                                error: true, message: "User is not an evaluee"
                            };
                            return sql.insert(
                                'group_evaluees',
                                { evaluee_id: user, group_id: group_id }
                            );
                        });
                    })
                );
            }).then(function(results){
                sql.commit();
            }).catch(function(error){
                return sql.rollback(function(err){
                    throw err;
                });
            });



        }

    };

    return self;

}
