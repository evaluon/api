module.exports = function(app, sql){

    var q = app.utils.q;

    var self = {

        isInstitution: function(user){
            return sql.selectOne('institution', { evaluator_id: user.id });
        },

        isEvaluator: function(user){
            return sql.selectOne('evaluator', { id: user.id });
        },

        setEvaluator: function(options){
            return sql.selectOne(
                'evaluee', { id: options.user_id }
            ).then(function(u){
                if(u) throw {
                    message: "Current user is evaluee",
                    statusCode: 403
                };
                return sql.insert('evaluator', options);
            });
        },

        evaluatorList: function(user){
            return self.isInstitution(user).then(function(institution){
                if(!institution) throw {
                    statusCode: 403,
                    message: "invalid_permissions"
                };
                return sql.query(
                    "SELECT u.*, e.* " +
                    "FROM user u, evaluator e, `group` g " +
                    "WHERE g.institution_id = ? AND " +
                    "   e.id = g.evaluator_id AND " +
                    "   u.id = e.id", [institution.id]
                );
            });
        },

        evaluatorGroups: function(user){
            return sql.selectOne('evaluator', { id: user.id }).then(function(e){
                if(!e) throw {
                    message: "User is not an evaluator",
                    statusCode: 403
                }
                return sql.select(
                    'group', { evaluator_id: user.id }
                ).then(function(groups){

                    var qs = [];

                    for(group in groups){

                        qs.push(
                            (function(group){
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
                                })
                            })(groups[group])
                        );

                    }

                    return q.all(qs);

                });
            });
        },

        isEvaluee: function(user){
            return sql.selectOne('evaluee', { id: user });
        },

        setEvaluee: function(options){
            return sql.selectOne(
                'evaluator', { id: options.user_id }
            ).then(function(u){
                if(u) throw {
                    message: "Current user is evaluator",
                    statusCode: 403
                };
                return sql.insert('evaluee', options);
            })
        },

        evalueeList: function(criteria){
            return sql.select('evaluees', criteria || {});
        },

        evalueeGroups: function(user){
            return sql.selectOne('evaluee', { id: user.id }).then(function(e){
                if(!e) throw {
                    message: "User is not an evaluee",
                    statusCode: 403
                }
                return sql.select('group_evaluees', { evaluee_id: user.id });
            });
        }

    }

    return self;

}
