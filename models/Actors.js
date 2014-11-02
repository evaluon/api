module.exports = function(app, sql){

    self = {

        isEvaluator: function(user){
            return sql.selectOne('evaluator', { id: user.id });
        },

        setEvaluator: function(user){
            return sql.selectOne(
                'evaluee', { id: user.id }
            ).then(function(u){
                if(u) throw { "message": "Current user is evaluee"};
                return sql.insert('evaluator', { id: user.id });
            });
        },

        evaluatorGroups: function(user){
            return sql.selectOne('evaluator', { id: user.id }).then(function(e){
                if(!e) throw {
                    message: "User is not an evaluator",
                    statusCode: 403
                }
                return sql.select('group', { evaluator_id: user.id });
            });
        },

        isEvaluee: function(user){
            return sql.selectOne('evaluee',  { id: user.id });
        },

        setEvaluee: function(user, isDisabled){
            return sql.selectOne(
                'evaluator', { id: user.id }
            ).then(function(u){
                if(u) throw { "message": "Current user is evaluator"};
                if(isDisabled != null){
                    return sql.insert(
                        'evaluee', { id: user.id, disabled: isDisabled }
                    );
                } else {
                    throw {
                        "message": "Must include 'disabled' field to " +
                            "indicate if user is visually disabled",
                        "missingFields": ["disabled"]
                    };
                }
            })
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
