module.exports = function(app, sql){

    self = {

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

        evalueeList: function(){
            return sql.select('evaluees');
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
